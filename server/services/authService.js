const jwt = require('jsonwebtoken')
const config = require('../config')

/**
 * Creats a jwt token for th provided payload, the token expires in the ttl configured in the config
 * and uses the secret provided in the config
 * @param {*} userInfo 
 */
const createAuthToken = async (userInfo) => {
    console.log(`config.serverkeys:${JSON.stringify(config.serverKeys)}`)
    const token = await jwt.sign(userInfo, config.serverKeys.secret, { expiresIn: config.jwtTTLInSeconds })
    console.log('auth token successfully generated')
    return token;
}

/**
 * validates the token by using the same server secret
 * @param {*} authToken 
 */
const validateAuthToken = async (authToken) => {
    const decodedData = await jwt.verify(authToken, config.serverKeys.secret);
    return decodedData
}

module.exports = {
    createAuthToken,
    validateAuthToken
}

