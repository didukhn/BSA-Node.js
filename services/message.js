const MessageRepository = require("../repositories/MessageRepository");

module.exports = {

  findAll: callback => {
    MessageRepository.getAll((err, data) => {
      callback(err, data);
    });
  },

  findOne: (id, callback) => {
    MessageRepository.getById(id, (err, data) => {
      callback(err, data);
    });
  },

  create: (message, callback) => {
    if (!message.receiverId) {
      return callback(new Error('missed receiver ID'));
    }

    if (!message.senderId) {
      return callback(new Error('missed sender ID'));
    }
    
    if(!message.text){
      return callback(new Error('missed message text'));
    }

    MessageRepository.create(message);
    MessageRepository.save((err, data) => {
      callback(err, data);
    });
  },

  update: (id, message, callback) => {
    if (!id)
      return callback(new Error('missed ID'));

    if (!message.senderId) {
      return callback(new Error('missed sender ID'));
    }
    
    if(!message.receiverId){
      return callback(new Error('missed receiver ID'));
    }
    
    if(!message.text){
      return callback(new Error('missed message text'));
    }

    MessageRepository.update(id, message, (err, data) => {
      if (!err) {
        message.id = id;
        return callback(null, message);
      }

      callback(err);
    });
  },

  delete: (id, callback) => {
    if (!id)
      return callback(new Error('missed id'));

    MessageRepository.delete(id, callback);
  },

};