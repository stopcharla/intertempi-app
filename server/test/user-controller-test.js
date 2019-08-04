const expect = require('chai').expect;
const sinon = require('sinon');
const userController = require('../controllers/userController');
const userService = require('../services/userService');
const authService = require('../services/authService');
const utils = require('../utils/utils');
const md5 = require('md5')

describe('Testing the functions in user controller', async () => {

    afterEach(function () {
        // completely restore all fakes created through the sandbox
        utils.validateObject.restore();
    });

    it('verifying the login api without providing required details', async () => {
        const req = {
            body: {
                emailId:'firstuser@intertempi.com'
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        // console.log('response:', response);
                        expect(status).to.be.equals(400);
                    }
                };
            }
        }
        sinon.stub(utils, 'validateObject').returns(false);
        await userController.login(req, res);
        // utils.validateObject.restore();
    });

    it('verifying the login api with invalid credentials', async () => {
        const req = {
            body: {
                password: md5('12345'),
                emailId:'user'
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        console.log('login unsuccessful:', response);
                        expect(status).to.be.equals(401);
                    }
                };
            }
        }
        sinon.stub(utils, 'validateObject').returns(true);
        sinon.stub(userService, 'getUserInfo').returns(Promise.resolve([]))
        await userController.login(req, res);
        // utils.validateObject.restore();
        userService.getUserInfo.restore();
    });

    it('verifying the login api with throwing error from get user data', async () => {
        const req = {
            body: {
                password: 'intertempi',
                emailId:'user@intertempi.com'
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        expect(status).to.be.equals(401);
                    }
                };
            }
        }
        sinon.stub(utils, 'validateObject').returns(true);
        sinon.stub(userService, 'getUserInfo').returns({})
        await userController.login(req, res);
        // utils.validateObject.restore();
        userService.getUserInfo.restore();
    });

    it('verifying the login api with providing required details', async () => {
        const expectedAuthToken = 'tokensample2345'
        const req = {
            body: {
                password: md5('123'),
                emailId:'user'
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        console.log('login successful:', response);
                        expect(status).to.be.equals(200);
                        expect(response.token).to.be.equal(expectedAuthToken)
                    }
                };
            }
        }
        
        sinon.stub(utils, 'validateObject').returns(true);
        sinon.stub(utils, 'isEmail').returns(false);
        sinon.stub(userService, 'getUserInfo').returns({pwdHash:req.body.password})
        sinon.stub(authService, 'createAuthToken').returns(Promise.resolve(expectedAuthToken))
        await userController.login(req, res);
        userService.getUserInfo.restore();
        authService.createAuthToken.restore();
        utils.isEmail.restore();
    });

    it('verifying the login api throwing exception in create auth token', async () => {
        const expectedAuthToken = 'tokensample2345'
        const req = {
            body: {
                password: md5('123'),
                emailId:'user'
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        console.log('login successful:', response);
                        expect(status).to.be.equals(401);
                    }
                };
            }
        }
        
        sinon.stub(utils, 'validateObject').returns(true);
        sinon.stub(utils, 'isEmail').returns(false);
        sinon.stub(userService, 'getUserInfo').returns({pwdHash:req.body.password})
        sinon.stub(authService, 'createAuthToken').returns(Promise.reject(expectedAuthToken))
        await userController.login(req, res);
        userService.getUserInfo.restore();
        authService.createAuthToken.restore();
        utils.isEmail.restore();
    });


    it('verifying the get Home Page Info api', async () => {
        const req = {};
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        expect(status).to.be.equals(200);
                    }
                };
            }
        }
        sinon.stub(utils, 'validateObject').returns(true);
        sinon.stub(userService, 'getHomePageData').returns(Promise.resolve({}))
        await userController.getHomePageInfo(req, res);
        userService.getHomePageData.restore();
    }); 
    
    it('verifying the get Home Page Info api by throwing exception in fetch', async () => {
        const req = {};
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        expect(status).to.be.equals(500);
                    }
                };
            }
        }
        sinon.stub(utils, 'validateObject').returns(true);
        sinon.stub(userService, 'getHomePageData').returns(Promise.reject({}))
        await userController.getHomePageInfo(req, res);
        userService.getHomePageData.restore();
    });    
    
});