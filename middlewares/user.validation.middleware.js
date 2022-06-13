const { user } = require('../models/user');
const ValidationService = require('../services/validationService');

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    try {
        const dataUser = req.body;
        if (Object.keys(dataUser).length === 0) {
            throw Error('User entity must not be empty')
        }
        for (let key in dataUser) {
            if (key === 'id' || !user.hasOwnProperty(key)) {
                throw Error('User entity to create isn\'t valid');
            }
        }
        const userValid = ValidationService.validateUser({ ...user, ...dataUser });
        if (userValid) {
            req.body = userValid;
            next();
        }
    } catch (err) {
        res.status(400).json({ error: true, message: err.message })
    }
}

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
    try {
        const dataUser = req.body;
        if (Object.keys(dataUser).length === 0) {
            throw Error('User entity must not be empty')
        }
        for (let key in dataUser) {
            if (key === 'id' || !user.hasOwnProperty(key)) {
                throw Error('User entity to update isn\'t valid')
            }
        }
        const userValid = ValidationService.validateUser({ ...dataUser });
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