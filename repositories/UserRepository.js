const connection = require("../db/dbconnect");
const Repository = require("./GeneralRepository");
const User = require("../models/user");

var INSERTED_USERS = [];

function UserRepository() {
  Repository.prototype.constructor.call(this);
  this.model = User;
}

function getUserContacts(id, callback) {
  var model = this.model;
  var query = model.aggregate([{
    $lookup: {
      from: "messages",
      localField: "id",
      foreignField: 'senderId',
      as: 'msgSended'
    }
  },
  {
    $lookup: {
      from: "messages",
      localField: "id",
      foreignField: 'receiverId',
      as: 'msgReceived'
    }
  },
  {
    $match: {
      $or: [
        { "msgSended.receiverId": id },
        { "msgReceived.senderId": id }
      ]
    }
  }, {
    $project: {
      _id: 0,
      __v: 0,
      msgSended: 0,
      msgReceived: 0
    }
  }]);
  query.exec(callback);
}

function create(user) {
  INSERTED_USERS.push(user);
}

function save(callback) {
  let toInsert = INSERTED_USERS;
  INSERTED_USERS = [];

  this.getMaxId((err, maxId) => {
    if (err)
      return callback(err);

    for (let item of toInsert) {
      item.id = maxId + 1;
      maxId++;
      let entity = new User(item);
      entity.save((err) => {
        if (!err) {
          return callback(null, item);
        }

        callback(err);
      });
    }
  });
}

UserRepository.prototype = new Repository();

UserRepository.prototype.create = create;
UserRepository.prototype.save = save;
UserRepository.prototype.getUserContacts = getUserContacts;

module.exports = new UserRepository();
