import { randomUUID } from 'crypto';
import db from '../../db';
import Board, { BoardType } from './board.model';
import Column from '../columns/column.model';
import { ResourceError } from '../../common/errors';

/**
 * Class BoardRepository for accessing Board data
 */
class BoardRepository {
  /** @internal _boards - reference to simulate base */
  _boards;

  /**
   * Constructor class BoardRepository
   * @returns Instance class BoardRepository
   */
  constructor() {
    this._boards = db.boards;
  }

  /**
   * Get all boards from database
   * @returns array of objects data the board
   */
  getAll(): BoardType[] {
    return Array.from(this._boards.values());
  }

  /**
   * Add board in db
   * @param board - data board \{title, columns\}
   * @returns object board \{id, title, columns\}
   */
  add(board: BoardType): BoardType {
    const id = randomUUID();
    const { columns, ...rest } = board;

    const instance = new Board({ ...rest, id, columns: columns.map((column) => new Column(column)) });
    this._boards.set(instance.id, instance);
    return Board.toResponse(instance);
  }

  /**
   * Get board record by id from db
   * @param id - board record uuid
   * @returns object board \{id, title, columns\}
   */
  get(id: UUIDType): BoardType {
    if (!this._boards.has(id)) {
      throw new ResourceError('board', 404, 'Board was not founded!');
    }
    return this._boards.get(id) as BoardType;
  }

  /**
   * Update board record by id from db
   * @param id - board record uuid
   * @param body - new board data of record
   * @returns object board \{id, title, columns\}
   */
  update(id: UUIDType, body: BoardType): BoardType {
    if (!this._boards.has(id)) {
      throw new ResourceError('board', 404, 'Board was not founded!');
    }
    this._boards.set(id, body);
    return body;
  }

  /**
   * Delete board record by id from db
   * @param id - board record uuid
   * @returns returns boolean type of query result
   */
  remove(id: UUIDType): boolean {
    return this._boards.delete(id);
  }
}

export default BoardRepository;
