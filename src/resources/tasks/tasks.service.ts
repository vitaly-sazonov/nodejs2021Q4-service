import TasksRepo from './tasks.repository';
import { TaskType } from './tasks.model';

const taskRepo = new TasksRepo();

/**
 * Get all tasks the board via TaskRepository
 * @param boardId - board uuid
 * @returns array of objects data the task
 */
const getAll = (boardId: UUIDType) => taskRepo.getAll(boardId);

/**
 * Add task in board via TaskRepository
 * @param boardId - board uuid
 * @param task - data task \{ title, order, description, userId, boardId, columnId\}
 * @returns object - data format to \{id, title, order, description, userId, boardId, columnId\}
 */
const add = (boardId: UUIDType, task: TaskType) => taskRepo.add(boardId, task);

/**
 * Get task record in board via TaskRepository
 * @param boardId - board uuid
 * @param id - task uuid
 * @returns instance Task
 */
const getTask = (boardId: UUIDType, id: UUIDType) => taskRepo.get(boardId, id);

/**
 * Update task record in board
 * @param boardId - board uuid
 * @param id - task uuid
 * @param body - new task data of record
 * @returns object task \{id, title, order, description, userId, boardId, columnId\}
 */
const update = (boardId: UUIDType, id: UUIDType, body: TaskType) => taskRepo.update(boardId, id, body);

/**
 * Delete task record in boards
 * @param boardId - board uuid
 * @param id - task uuid
 * @returns returns boolean type of query result
 */
const remove = (boardId: UUIDType, id: UUIDType) => taskRepo.remove(boardId, id);

/**
 * Service of tasks
 * @returns functions \{ getAll, add, getTask, update, remove \}
 */
export default { getAll, add, getTask, update, remove };
