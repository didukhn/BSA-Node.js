const UserRepository = require("../repositories/UserRepository");

module.exports = {

  findAll: callback => {
    UserRepository.getAll((err, data) => {
      callback(null, data);
    });
  },

  findOne: (id, callback) => {
    UserRepository.getById(id, (err, data) => {
      callback(err, data);
    });
  },

  create: (user, callback) => {
    if (!user.name) {
      return callback(new Error('missed user name'));
    }

    if (!user.email) {
      return callback(new Error('missed user email'));
    }

    UserRepository.create(user);
    UserRepository.save((err, data) => {
      callback(err, data);
    });
  },

  update: (id, user, callback) => {
    if (!id)
      return callback(new Error('missed id'));

    if (!user.name) {
      return callback(new Error('missed user name'));
    }

    if (!user.email) {
      return callback(new Error('missed user email'));
    }

    UserRepository.update(id, user, (err, data) => {
      if (!err) {
        user.id = id;
        return callback(null, user);
      }

      callback(err);
    });
  },

  delete: (id, callback) => {
    if (!id)
      return callback(new Error('missed id'));

    UserRepository.delete(id, callback);
  },

  getUserContacts: (id, callback) => {
    if (!id)
      return callback(new Error('missed id'));

    UserRepository.getUserContacts(id, (err, data) => {
      callback(err, data);
    });
  }

};