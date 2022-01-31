import { Connection } from 'typeorm';

import TasksRepo from './tasks.repository';
import { TaskType } from './tasks.model';

const taskRepo = new TasksRepo();

/**
 * Get all tasks the board via TaskRepository
 * @param boardId - board uuid
 * @returns array of objects data the task
 */
const getAll = (db: Connection, boardId: UUIDType) => taskRepo.getAll(db, boardId);

/**
 * Add task in board via TaskRepository
 * @param boardId - board uuid
 * @param task - data task \{ title, order, description, userId, boardId, columnId\}
 * @returns object - data format to \{id, title, order, description, userId, boardId, columnId\}
 */
const add = (db: Connection, boardId: UUIDType, task: TaskType) => taskRepo.add(db, boardId, task);

/**
 * Get task record in board via TaskRepository
 * @param boardId - board uuid
 * @param id - task uuid
 * @returns instance Task
 */
const getTask = (db: Connection, boardId: UUIDType, id: UUIDType) => taskRepo.get(db, boardId, id);

/**
 * Update task record in board
 * @param boardId - board uuid
 * @param id - task uuid
 * @param body - new task data of record
 * @returns object task \{id, title, order, description, userId, boardId, columnId\}
 */
const update = (db: Connection, boardId: UUIDType, id: UUIDType, body: TaskType) => taskRepo.update(db, boardId, id, body);

/**
 * Delete task record in boards
 * @param boardId - board uuid
 * @param id - task uuid
 * @returns returns boolean type of query result
 */
const remove = async (db: Connection, boardId: UUIDType, id: UUIDType) => {
  await taskRepo.remove(db, boardId, id);
};

/**
 * Service of tasks
 * @returns functions \{ getAll, add, getTask, update, remove \}
 */
export default { getAll, add, getTask, update, remove };
