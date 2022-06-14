const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/', async (req, res, next) => {
    try {
        const fighters = await FighterService.getAll();
        res.statusCode = 200;
        res.data = fighters;
    } catch (err) {
        res.statusCode = err.code;
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware);

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const fighter = await FighterService.search({ id });
        res.statusCode = 200;
        res.data = fighter;
    } catch (err) {
        res.statusCode = err.code;
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware);

router.post('/', createFighterValid, async (req, res, next) => {
    try {
        const fighter = await FighterService.create(req.body);
        res.statusCode = 200;
        res.data = fighter;
    } catch (err) {
        res.statusCode = err.code;
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware);

router.put('/:id', updateFighterValid, async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedFighter = await FighterService.update(id, req.body);
        res.statusCode = 200;
        res.data = updatedFighter;
    } catch (err) {
        res.statusCode = err.code;
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedFighter = await FighterService.delete(id);
        res.statusCode = 200;
        res.data = deletedFighter
    } catch (err) {
        res.statusCode = err.code;
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;