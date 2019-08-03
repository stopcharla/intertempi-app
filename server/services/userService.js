const userData = require('../sampleUserData.json');
console.log(userData.emailMap)

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

module.exports = { getUserInfo }