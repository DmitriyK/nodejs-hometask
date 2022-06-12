const { user } = require('../models/user');
const ValidationService = require('../services/validationService');
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  try {
    const data = req.body;
    if(Object.keys(data).length === 0){
        throw Error('Request body cannot be empty')
    }
    for (let prop in data) {
      switch(prop) {
        case 'firstName':
          if (!ValidationService.isString(data[prop])) {
            throw Error('First name is not valid');
          }
          break;
        case 'lastName':
          if (!ValidationService.isString(data[prop])) {
            throw Error('Last name is not valid');
          }
          break;
        case 'email':
          if (ValidationService.isExist({ prop: data[prop] })) {
            throw Error('Email is exist');
          }
          if (!ValidationService.isEmail(data[prop])) {
            throw Error('Email must be gmail');
          }
          break;
        case 'phoneNumber':
          if (ValidationService.isExist({ prop: data[prop] })) {
            throw Error('Phone number is exist');
          }
          if (!ValidationService.isPhoneNumber(data[prop])) {
            throw Error('Phone number format +380XXXXXXXXX');
          }
          break
        case 'password':
          if (!ValidationService.isString(data[prop], 3)) {
            throw Error('Password is not valid');
          }
          break;
        default:
          throw Error(`${prop} in the body of requests must be absent`);
      }
    }
    next();
  } catch (err) {
    res.status(400).json({ error: true, message: err.message })
  }
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;