const { fighter } = require('../models/fighter');
const ValidationService = require('../services/validationService');

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    try {
        const dataFighter = req.body;
        if (Object.keys(dataFighter).length === 0) {
            throw Error('Fighter entity must not be empty')
        }
        for (let key in dataFighter) {
            if (key === 'id' || !fighter.hasOwnProperty(key)) {
                throw Error('Fighter entity to create isn\'t valid');
            }
        }
        const fighterValid = ValidationService.validateFighter({ ...fighter, ...dataFighter });
        if (fighterValid) {
            req.body = fighterValid;
            next();
        };
    } catch (err) {
        res.status(400).json({ error: true, message: err.message })
    }
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    try {
        const dataFighter = req.body;
        if (Object.keys(dataFighter).length === 0) {
            throw Error('Fighter entity must not be empty');
        };
        for (let key in dataFighter) {
            if (key === 'id' || !fighter.hasOwnProperty(key)) {
                throw Error('Fighter entity to create isn\'t valid');
            }
        };
        const fighterValid = ValidationService.validateFighter({ ...dataFighter });
        if (fighterValid) {
            req.body = fighterValid;
            next();
        };
    } catch (err) {
        res.status(400).json({ error: true, message: err.message })
    }
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;