import { randomUUID } from 'crypto';
import db from '../../db';
import Board from './board.model';

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
    const id = randomUUID();

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

export default BoardRepository;
