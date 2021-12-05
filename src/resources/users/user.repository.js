const uuid = require('uuid');

const User = require('./user.model');
const db = require('../../db');

class UserRepository {
  constructor() {
    this._users = db.users;
  }

  getAll() {
    const arrayUsers = Array.from(this._users.values());
    return arrayUsers.map((user) => {
      const { password, ...rest } = user;
      return { ...rest };
    });
  }

  add(user) {
    const id = uuid.v4();
    const instance = new User({ ...user, id });
    this._users.set(instance.id, instance);
    return User.toResponse(instance);
  }

  get(id) {
    if (!this._users.has(id)) {
      throw new Error('User was not founded!');
    }
    const user = this._users.get(id);
    return User.toResponse(user);
  }

  update(id, body) {
    if (!this._users.has(id)) {
      throw new Error('User was not founded!');
    }
    const user = this._users.set(id, body);
    return User.toResponse(user);
  }

  remove(id) {
    return this._users.delete(id);
  }
}

module.exports = UserRepository;
