import { Connection } from 'typeorm';

import BoardsRepo from './board.repository';
import { BoardType } from './board.model';

const boardRepo = new BoardsRepo();

/**
 * Get all board via BoardRepository
 * @returns array of objects data the board
 */
const getAll = (db: Connection) => boardRepo.getAll(db);

/**
 * Add board in db via UserRepository
 * @param board - data board
 * @returns object board \{id, title, columns\}
 */
const add = (db: Connection, board: BoardType) => boardRepo.add(db, board);

/**
 * Get board record by id from db via BoardRepository
 * @param id - board uuid
 * @returns object board \{id, title, columns\}
 */
const getBoard = (db: Connection, id: UUIDType) => boardRepo.get(db, id);

/**
 * Update board record by id from db via BoardRepository
 * @param id - board uuid
 * @param body - new board data of record
 * @returns object board \{id, title, columns\}
 */
const update = (db: Connection, id: UUIDType, body: BoardType) => boardRepo.update(db, id, body);

/**
 * Delete all tasks record related with board by id from db via TaskRepository
 * Delete board record by id from db via BoardRepository
 * @param id - board uuid
 * @returns void
 */
const remove = async (db: Connection, id: UUIDType) => {
  await boardRepo.remove(db, id);
};

/**
 * Service of board
 * @returns functions \{ getAll, add, getBoard, update, remove \}
 */
export default { getAll, add, getBoard, update, remove };
