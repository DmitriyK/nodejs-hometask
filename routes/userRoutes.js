const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
router.get('/', async (req, res, next) => {
    try {
        const users = await UserService.getAll();
        res.statusCode = 200;
        res.data = users;
    } catch (err) {
        res.statusCode = err.code;
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserService.search({ id });
        res.statusCode = 200;
        res.data = user;
    } catch (err) {
        res.statusCode = err.code;
        res.err = err;
    } finally {
        next();
    }
  }, responseMiddleware);

router.post('/', createUserValid, async (req, res, next) => {
    try {
        const user = await UserService.create(req.body);
        res.statusCode = 200;
        res.data = user;
    } catch (err) {
        console.log(err.code, err.message);
        res.statusCode = err.code;
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateUserValid, async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUser = await UserService.update(id, req.body);
        res.statusCode = 200;
        res.data = updatedUser;
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
        const deletedUser = await UserService.delete(id);
        res.statusCode = 200;
        res.data = deletedUser;
    } catch (err) {
        res.statusCode = err.code;
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;