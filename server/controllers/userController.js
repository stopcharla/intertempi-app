const userService = require('../services/userService');
const utils = require('../utils/utils');
const authService = require('../services/authService');

/**
 * Logs in the user, the credentials are extracted from the body and compared agnaist the db values,
 * the password hash is compared using bcrypt. 
 * if credentials are found valid then a JWT token is generated for the user and returned as a part of response
 * returns 200 on success along with tokenID
 * retuns 400 on failure with invalid credntials message
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {
    if(utils.validateObject(req.body, ['emailId', 'password'])){
        try{
            console.log('validating object');
            const emailId = req.body.emailId.toLowerCase();
            const userInfo = userService.getUserInfo(emailId, utils.isEmail(emailId));
            if(userInfo.pwdHash && userInfo.pwdHash.length > 0 && userInfo.pwdHash === req.body.password){
                    console.log('matched and generating token');
                    const tokenId = await authService.createAuthToken({emailId});
                    res.status(200).send({token:tokenId});
                    return;
            }
            else{
                res.status(401).send({message:'invalid credentials'})
            }       
        } catch (error) {
            // console.error('caught exception',error)
            res.status(401).send({message:'invalid credentials'})
        }
    }else{
        res.status(400).send({message:'username or password missing'})
    } 
}

/**
 * To obtain the home page for users, currently provides the flickr api to fetch images for user,
 * which can be extended further later
 * @param {*} req 
 * @param {*} res 
 */
const getHomePageInfo = async (req, res) => {

    try{
        const response = await userService.getHomePageData()
        res.status(200).send(response)
    }catch(err)  {
        res.status(500).send({message:'error occurred'})
    }
}

module.exports = {
    getHomePageInfo,
    login,
}