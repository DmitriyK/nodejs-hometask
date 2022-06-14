const UserService = require('./userService');

class AuthService {
    login({ email, password = null }) {
        const user = UserService.search({ email });
        if (user.password === password) {
           return user;
        }
        const err = new Error('Incorrect password');
        err.code = 400;
        throw err;
    }
}

module.exports = new AuthService();