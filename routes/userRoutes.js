const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
router.get('/', async (req, res, next) => {
    try {
        const users = await UserService.getAll();
        if (users.length === 0) {
            res.status(404);
            throw Error('Users are not found');
        }
        res.data = users;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserService.search({ id });
        if (!user) {
            res.status(404);
            throw Error('User is not found');
        }
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
  }, responseMiddleware);

router.post('/', createUserValid, async (req, res, next) => {
    try {
        const user = await UserService.create(req.body);
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateUserValid, async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserService.search({ id });
        if (!user) {
            res.status(404);
            throw Error('User is not found');
        }
        const updatedUser = await UserService.update(id, req.body);
        res.data = updatedUser;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserService.search({ id });
        if (!user) {
            res.status(404);
            throw Error('User is not found');
        }
        const deletedUser = await UserService.delete(id);
        res.data = deletedUser;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;