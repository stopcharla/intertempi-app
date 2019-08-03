/**
 * Checks if the jsonObject contains all the required keys in the object
 * returns true if all keys are available else false
 * @param {object} jsonObject 
 * @param {Array} keys 
 */

const validateObject = (jsonObject, keys) => {
    let isVaild = true;
    for (let key of keys){
        if(typeof jsonObject[key] === 'undefined' || jsonObject[key] === null || jsonObject[key].length < 1){
            isVaild = false
        }
    }
    return isVaild
}

const isEmail = (emailString) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(emailString);
}

module.exports = {
    validateObject,
    isEmail
}