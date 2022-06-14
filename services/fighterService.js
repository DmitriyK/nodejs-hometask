const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    getAll() {
        const items = FighterRepository.getAll();
        if (items.length === 0) {
            const err = new Error('Fighters not found');
            err.code = 404;
            throw err;
        }
        return items;
    }
    
    search(search) {
        const item = FighterRepository.getOne(search);
        if (!item) {
            const err = new Error('Fighter not found');
            err.code = 404;
            throw err;
        }
        return item;
    }
    
    create(data) {
        const item = FighterRepository.create(data);
        if(!item) {
            const err = new Error('Fighter not created');
            err.code = 400;
            throw err;
        }
        return item;
    }

    update(id, data) {
        if (this.search({ id })) {
            const updatedItem = FighterRepository.update(id, data);
            if (!updatedItem) {
                const err = new Error('Fighter not updated');
                err.code = 400;
                throw err;
            }
            return updatedItem;
        }
    }
    
    delete(id) {
        if (this.search({ id })) {
            const deletedItem = FighterRepository.delete(id);
            if (!deletedItem) {
                const err = new Error('Fighter not deleted');
                err.code = 400;
                throw err;
            }
            return deletedItem;
        }
    }

}

module.exports = new FighterService();