const userData = require('../sampleUserData.json');
const rp = require('request-promise');
const config = require('../config.json');

const getUserInfo = function (userName, isEmail){
    console.log(`getting userinfo for user:${userName} isEmail:${isEmail}`);
    let pwdHash = null;
    if(isEmail){
        userName = userData.emailMap[userName]
    }
    if(userName !== null){
        pwdHash = userData.credentials[userName]
    }
    return { pwdHash }
}

const getHomePageData = async () =>{
    return await rp(config.DataURL)
}

module.exports = { getUserInfo, getHomePageData }