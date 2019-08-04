const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authService = require('../services/authService')

/**
 * Authentication middleware to verify the auth token provided by user
 * We verify the jwt token
 * to next step. else rejcteing the request with a 403
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authMiddleWare = async (req, res, next) => {
  console.log('Auth middleware')
  const bearerToken = req.headers['authorization'];
  if( typeof bearerToken !== 'undefined'){
    try{
      const token = bearerToken.split(' ')[1];
      const userInfo = await authService.validateAuthToken(token)
      console.log('auth successfully verified:', userInfo.emailId)
      next()
    }catch(error) {
      res.status(401).send({message:'invalid credentials'})
    }
    
  }else{
    res.status(401).send({message:'invalid credentials'})
  }
}

/**
 * once a user is logged in he can obtain all the registered users info
 */
router.get('/home', [authMiddleWare] ,function (req, res) {
  console.log('get users request');
  userController.getHomePageInfo(req, res);
});

/**
 * route to login a user
 */
router.post('/login', function (req,res) {
  console.log('login request:', req.body);
  userController.login(req, res);
})

module.exports = router;
