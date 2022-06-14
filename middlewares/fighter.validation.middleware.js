const { fighter } = require('../models/fighter');
const ValidationService = require('../services/validationService');

const checkFighterEntity = (dataFighter) => {
    if (Object.keys(dataFighter).length === 0) {
        throw Error('Fighter entity must not be empty')
    }
    for (let key in dataFighter) {
        if (key === 'id' || !fighter.hasOwnProperty(key)) {
            throw Error('Fighter entity to create isn\'t valid');
        }
    }
}

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    try {
        checkFighterEntity(req.body);
        console.log(req.body);
        const fighterValid = ValidationService.validateFighter({ ...fighter, ...req.body });
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
        checkFighterEntity(req.body);
        const fighterValid = ValidationService.validateFighter({ ...req.body });
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