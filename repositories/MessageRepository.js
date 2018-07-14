const connection = require("../db/dbconnect");
const Repository = require("./GeneralRepository");
const Message = require("../models/message");

var INSERTED_MESSAGES = [];

function MessageRepository() {
  Repository.prototype.constructor.call(this);
  this.model = Message;
}

function create(user) {
  INSERTED_MESSAGES.push(user);
}

function save(callback) {
  let toInsert = INSERTED_MESSAGES;
  INSERTED_MESSAGES = [];

  this.getMaxId((err, maxId) => {
    if (err)
      return callback(err);

    for (let item of toInsert) {
      item.id = maxId + 1;
      maxId++;
      let entity = new Message(item);
      entity.save(function (err) {
        err && callback(err);
      });

    }
  });
}

MessageRepository.prototype = new Repository();
MessageRepository.prototype.create = create;
MessageRepository.prototype.save = save;

module.exports = new MessageRepository();