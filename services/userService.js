const { UserRepository } = require('../repositories/userRepository');

class UserService {
    // TODO: Implement methods to work with user
    getAll() {
        const items = UserRepository.getAll();
        if (items.length === 0) {
            const err = new Error('Users not found');
            err.code = 404;
            throw err;
        }
        return items;
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if (!item) {
            const err = new Error('User not found');
            err.code = 404;
            throw err;
        }
        return item;
    }

    create(data) {
        const item = UserRepository.create(data);
        if (!item) {
            const err = new Error('User not created');
            err.code = 400;
            throw err;
        }
        return item;
    }

    update(id, data) {
        if (this.search({ id })) {
            const updatedItem = UserRepository.update(id, data);
            if (!updatedItem) {
                const err = new Error('User not updated');
                err.code = 400;
                throw err;
            }
            return updatedItem;
        }
    }

    delete(id) {
        if (this.search({ id })) {
            const deletedItem = UserRepository.delete(id);
            if (!deletedItem) {
                const err = new Error('User not deleted');
                err.code = 400;
                throw err;
            }
            return deletedItem;
        }
    }
}

module.exports = new UserService();