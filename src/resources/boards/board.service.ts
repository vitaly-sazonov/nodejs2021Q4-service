import BoardsRepo from './board.repository';
import TasksRepo from '../tasks/tasks.repository';
import { BoardType } from './board.model';

const boardRepo = new BoardsRepo();
const taskRepo = new TasksRepo();

/**
 * Get all board via BoardRepository
 * @returns array of objects data the board
 */
const getAll = () => boardRepo.getAll();

/**
 * Add board in db via UserRepository
 * @param board - data board
 * @returns object board \{id, title, columns\}
 */
const add = (board: BoardType) => boardRepo.add(board);

/**
 * Get board record by id from db via BoardRepository
 * @param id - board uuid
 * @returns object board \{id, title, columns\}
 */
const getBoard = (id: UUIDType) => boardRepo.get(id);

/**
 * Update board record by id from db via BoardRepository
 * @param id - board uuid
 * @param body - new board data of record
 * @returns object user \{id, title, columns\}
 */
const update = (id: UUIDType, body: BoardType) => boardRepo.update(id, body);

/**
 * Delete all tasks record related with board by id from db via TaskRepository
 * Delete board record by id from db via BoardRepository
 * @param id - board uuid
 * @returns void
 */
const remove = (id: UUIDType) => {
  taskRepo.removeMany(id);
  boardRepo.remove(id);
};

/**
 * Service of board
 * @returns functions \{ getAll, add, getBoard, update, remove \}
 */
export default { getAll, add, getBoard, update, remove };
