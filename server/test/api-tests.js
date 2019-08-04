const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const md5 = require('md5');

describe('testing all the rest apis', () => {
    

    it('login api should return 200 and get home page info api as well', async () => {
        const requestBody = {
            emailId: 'user',
            password: md5('123')
        }
        const loginresponse = await request(app).post('/api/v1/login').send(requestBody);
        expect(loginresponse.status).to.be.equal(200);
        const authtoken = loginresponse.body.token;
        console.log('successfully logged in');

        const usersresponse = await request(app).get('/api/v1/home').set('Authorization', `bearer ${authtoken}`).send();
        expect(usersresponse.status).to.be.equal(200);
    })


})