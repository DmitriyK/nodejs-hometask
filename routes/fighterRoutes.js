const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/', async (req, res, next) => {
    try {
        const fighters = await FighterService.getAll();
        if (fighters.length === 0) {
            res.status(404);
            throw Error('Fighters are not found');
        }
        res.data = fighters;
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const fighter = await FighterService.search({ id });
        if (!fighter) {
            res.status(404);
            throw Error('Fighter is not found')
        }
        res.data = fighter
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.post('/', createFighterValid, async (req, res, next) => {
    try {
        const fighter = await FighterService.create(req.body);
        res.data = fighter;
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.put('/:id', updateFighterValid, async (req, res, next) => {
    try {
        const id = req.params.id;
        const fighter = await FighterService.search({ id });
        if (!fighter) {
            res.status(404);
            throw Error('Fighter is not found')
        }
        const updatedFighter = await FighterService.update(id, req.body);
        res.data = updatedFighter;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const fighter = await FighterService.search({ id });
        if (!fighter) {
            res.status(404);
            throw Error('Fighter is not found')
        }
        const deletedFighter = await FighterService.delete(id)
        res.data = deletedFighter
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;