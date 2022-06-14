const { user } = require('../models/user');
const ValidationService = require('../services/validationService');


const checkUserEntity = (dataUser) => {
    if (Object.keys(dataUser).length === 0) {
        throw new Error('User entity must not be empty');
    }
    for (let key in dataUser) {
        if (key === 'id' || !user.hasOwnProperty(key)) {
            throw new Error('User entity to create isn\'t valid');
        }
    }
}

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    try {
        checkUserEntity(req.body);
        const userValid = ValidationService.validateUser({ ...user, ...req.body });
        if (userValid) {
            req.body = userValid;
            next();
        }
    } catch (err) {
        res.status(400).json({ error: true, message: err.message });
    }
}

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
    try {
        checkUserEntity(req.body);
        const userValid = ValidationService.validateUser({ ...req.body });
        if (userValid) {
            req.body = userValid;
            next();
        }
    } catch (err) {
        res.status(400).json({ error: true, message: err.message });
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;