const { UserRepository } = require('../repositories/userRepository');

class UserService {
  // TODO: Implement methods to work with user
  getAll() {
      const item = UserRepository.getAll();
      if (!item) {
          return null;
      }
      return item;
  }

  search(search) {
      const item = UserRepository.getOne(search);
      if (!item) {
          return null;
      }
      return item;
  }

  create(data) {
      const item = UserRepository.create(data);
      if (!item) {
          return null;
      }
      return item;
  }

  update(id, data) {
      const item = UserRepository.update(id, data);
      if (!item) {
          return null;
      }
      return item;
  }

  delete(id) {
      const item = UserRepository.delete(id);
      if (!item) {
          return null;
      }
      return item;
  }
}

module.exports = new UserService();