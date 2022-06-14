const { UserRepository } = require('../repositories/userRepository');
const { FighterRepository } = require('../repositories/fighterRepository');

class ValidationService {
  isString({ value, minLength = 1, maxLength = 99 }) {
    if (typeof value === 'string') {
      const lengthValue = value.trim().length;
      if (lengthValue >= minLength && lengthValue <= maxLength) {
        return true;
      }
      return false;
    }
    return false;
  }

  isNumber({ value, min = 1, max = 120 }) {
    if (typeof value === 'number') {
      if ( min <= value && value <= max) {
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
    if (this.isString({ value }) && /^[\w.+\-]+@gmail\.com$/g.test(value)) {
      return true;
    }
    return false;
  }

  isExist({ key, value, type = 'user' }) {
    const repository  = type === 'user' ? UserRepository : FighterRepository;
    const finded = repository.getAll().find(element => value.toLowerCase() === element[key].toLowerCase());
    if (finded) {
      return true;
    }
    return false
  }


  isPhoneNumber(value) {
    if (this.isString({ value })){
      const isValid = value.match(/\+380[0-9]{9}/);
      if (isValid){
        return true;
      }
      return false;
    }
    return false;
  }

  validateUser(data) {
    for (const [key, value] of Object.entries(data)) {
      switch(key) {
        case 'firstName':
          if (this.isEmptyStr(value)) {
            throw new Error('First name is required');
          }
          if (!this.isString({ value })) {
            throw new Error('First name is not valid');
          }
          break;
        case 'lastName':
          if (this.isEmptyStr(value)) {
            throw new Error('Last name is required');
          }
          if (!this.isString({ value })) {
            throw new Error('Last name is not valid');
          }
          break;
        case 'email':
          if (this.isEmptyStr(value)) {
            throw new Error('Email is required');
          }
          if (this.isExist({ key, value })) {
            throw new Error('Email is exist');
          }
          if (!this.isEmail(value)) {
            throw new Error('Email must be @gmail.com');
          }
          break;
        case 'phoneNumber':
          if (this.isEmptyStr(value)) {
            throw new Error('Phone number is required');
          }
          if (this.isExist({ key, value })) {
            throw new Error('Phone number is exist');
          }
          if (!this.isPhoneNumber(value)) {
            throw new Error('Phone number format +380XXXXXXXXX');
          }
          break;
        case 'password':
          if (this.isEmptyStr(value)) {
            throw new Error('Password is required');
          }
          if (!this.isString({ value, min: 3 })) {
            throw new Error('Password must contain min 3 symbols');
          }
          break;
        default:
          break;
      }
    }
    return data;
  }

  validateFighter(data) {
    for (const [key, value] of Object.entries(data)) {
      switch(key) {
        case 'name':
          if (this.isEmptyStr(value)) {
            throw new Error('Name is required');
          }
          if (this.isExist({ key, value, type: 'fighter' })) {
            throw new Error('Name is exist');
          }
          if (!this.isString({ value })) {
            throw new Error('Name is not valid');
          }
          break;
        case 'health':
          if (!this.isNumber({ value, min: 80, max: 120 })) {
            throw new Error('Health must be from 80 to 120');
          }
          break;
        case 'power':
          if (value === null || value === 0) {
            throw new Error('Power is required');
          }
          if (!this.isNumber({ value, min: 1, max: 100 })) {
            throw new Error('Power must be from 1 to 100');
          }
          break;
        case 'defense':
          if (value === null || value === 0) {
            throw new Error('Defense is required');
          }
          if (!this.isNumber({ value, min: 1, max: 10})) {
            throw new Error('Defense must be from 1 to 10');
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