const UserService = require('./userService');
const FighterService = require('./fighterService');

class ValidationService {
  isString(value, minLength = 1, maxLength = 99) {
    if (typeof value === 'string') {
      const lengthValue = value.trim().length;
      if (lengthValue >= minLength && lengthValue <= maxLength) {
        return true;
      }
      return false;
    }
    return false;
  }

  isEmail(value) {
    if (this.isString(value) && value.slice(-10) === '@gmail.com') {
      return true;
    }
    return false;
  }

  isExist(value, type = 'user') {
    if (type === 'user') {
      if (UserService.search(value)) {
        return true;
      }
      return false;
    }
  }

  isPhoneNumber(value) {
    if(this.isString(value)){
      const isValid = value.match(/\+380[0-9]{9}/);
      if (isValid){
        return true;
      }
      return false;
    }
    return false;
  }

}

module.exports = new ValidationService();