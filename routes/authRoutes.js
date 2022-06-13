const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', async (req, res, next) => {
    try {
        // TODO: Implement login action (get the user if it exist with entered credentials)
        const user = await AuthService.login({ email: req.body.email });
        if (user.password !== req.body.password) {
            throw Error('Incorrect password');
        }
        res.data = user;
    } catch (err) {
        res.status(401);
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;