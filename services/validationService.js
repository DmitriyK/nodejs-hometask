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

  isNumber(value, min = null, max = null) {
    if (typeof value === 'number') {
      if ( min < value && value < max) {
        return true;
      }
      return false;
    }
    return false;
  }

  isEmptyStr(value) {
    return value.length === 0 ? true : false;
  }

  isEmail(value) {
    if (this.isString(value) && value.slice(-10) === '@gmail.com') {
      return true;
    }
    return false;
  }

  isExist(value, type = 'user') {
    if (type === 'user') {
      console.log(value, UserService.search(value))
      if (UserService.search(value)) {
        return true;
      }
      return false;
    }
    if (type === 'fighter') {
      if (FighterService.search(value)) {
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

  validateUser(data) {
    for (let prop in data) {
      switch(prop) {
        case 'firstName':
          if (this.isEmptyStr(data[prop])) {
            throw Error('First name is required');
          }
          if (!this.isString(data[prop])) {
            throw Error('First name is not valid');
          }
          break;
        case 'lastName':
          if (this.isEmptyStr(data[prop])) {
            throw Error('Last name is required');
          }
          if (!this.isString(data[prop])) {
            throw Error('Last name is not valid');
          }
          break;
        case 'email':
          if (this.isEmptyStr(data[prop])) {
            throw Error('Email is required');
          }
          if (this.isExist({ email: data[prop] })) {
            throw Error('Email is exist');
          }
          if (!this.isEmail(data[prop])) {
            throw Error('Email must be @gmail.com');
          }
          break;
        case 'phoneNumber':
          if (this.isEmptyStr(data[prop])) {
            throw Error('Phone number is required');
          }
          if (this.isExist({ phoneNumber: data[prop] }, user)) {
            throw Error('Phone number is exist');
          }
          if (!this.isPhoneNumber(data[prop])) {
            throw Error('Phone number format +380XXXXXXXXX');
          }
          break;
        case 'password':
          if (this.isEmptyStr(data[prop])) {
            throw Error('Password is required');
          }
          if (!this.isString(data[prop], 3)) {
            throw Error('Password must contain min 3 symbols');
          }
          break;
        default:
          break;
      }
    }
    return data;
  }

  validateFighter(data) {
    for (let prop in data) {
      switch(prop) {
        case 'name':
          if (this.isEmptyStr(data[prop])) {
            throw Error('Name is required');
          }
          if (this.isExist({ name: data[prop] }, 'fighter')) {
            throw Error('Name is exist');
          }
          if (!this.isString(data[prop])) {
            throw Error('Name is not valid');
          }
          break;
        case 'health':
          console.log(data[prop]);
          if (!this.isNumber(data[prop], 80, 120)) {
            throw Error('Health is not valid');
          }
          break;
        case 'power':
          if (this.isEmptyStr(data[prop])) {
            throw Error('Power is required');
          }
          if (!this.isNumber(data[prop], 1, 100)) {
            throw Error('Power is not valid');
          }
          break;
        case 'defense':
          if (this.isEmptyStr(data[prop])) {
            throw Error('Defense is required');
          }
          if (!this.isNumber(data[prop], 1, 10)) {
            throw Error('Defense is not valid');
          }
          break;
        default:
          break;
      }
    }
    return data;
  }
}

module.exports = new ValidationService();