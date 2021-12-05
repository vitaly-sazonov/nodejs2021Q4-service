const uuid = require('uuid');

const db = require('../../db');

const Board = require('./board.model');
//! const ColumnRepository = require('../columns/column.repository');

class BoardRepository {
  constructor() {
    this._boards = db.boards;
  }

  getAll() {
    const arrayUsers = Array.from(this._boards.values());
    return arrayUsers.map((user) => {
      const { password, ...rest } = user;
      return { ...rest };
    });
  }

  add(board) {
    const id = uuid.v4();

    const instance = new Board({ ...board, id });
    this._boards.set(instance.id, instance);
    return Board.toResponse(instance);
  }

  get(id) {
    if (!this._boards.has(id)) {
      throw new Error('Board was not founded!');
    }
    const user = this._boards.get(id);
    return user;
  }

  update(id, body) {
    if (!this._boards.has(id)) {
      throw new Error('Board was not founded!');
    }
    const user = this._boards.set(id, body);
    return user;
  }

  remove(id) {
    return this._boards.delete(id);
  }
}

module.exports = BoardRepository;
