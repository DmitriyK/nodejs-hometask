const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    getAll() {
        const item = FighterRepository.getAll();
        if (!item) {
            return null;
        }
        return item;
    }
    
    search(search) {
        const item = FighterRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }
    
    create(data) {
        const item = FighterRepository.create(data);
        if(!item) {
            return null;
        }
        return item;
    }

    update(id, data) {
        const item = FighterRepository.update(id, data);
        if (!item) {
            return null;
        }
        return item;
    }
    
    delete(id) {
        const item = FighterRepository.delete(id);
        if (!item) {
            return null;
        }
        return item;
    }

}

module.exports = new FighterService();