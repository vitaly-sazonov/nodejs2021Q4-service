import { randomUUID } from 'crypto';
import Task, { TaskType } from './tasks.model';
import { ResourceError } from '../../common/errors';

import db from '../../db';

/**
 * Class TaskRepository for accessing Task data
 */
class TaskRepository {
  /** @internal _tasks - reference to simulate base */
  _tasks;

  /**
   * Constructor class TaskRepository
   * @returns Instance class TaskRepository
   */
  constructor() {
    this._tasks = db.tasks;
  }

  /**
   * Get all tasks or all tasks of board from database
   * @param boardId - board uuid
   * @returns array of objects data the task
   */
  getAll(boardId?: UUIDType): Task[] {
    let tasks;
    tasks = Array.from(this._tasks.values());
    if (boardId) {
      tasks = tasks.filter((task) => task.boardId === boardId);
    }
    return tasks;
  }

  /**
   * Add task in db
   * @param boardId - board uuid
   * @param task - data task \{title, order, description, userId, boardId, columnId\}
   * @returns object - data format to \{id, title, order, description, userId, boardId, columnId\}
   */
  add(boardId: UUIDType, task: TaskType): TaskType {
    const id = randomUUID();
    const instance = new Task({ ...task, id, boardId });
    this._tasks.set(instance.id, instance);
    return Task.toResponse(instance as TaskType);
  }

  /**
   * Get task record from db
   * @param boardId - board uuid
   * @param id - task uuid
   * @returns instance Task
   */
  get(boardId: UUIDType, id: UUIDType): Task {
    const task = this._tasks.get(id);
    if (task && task.boardId === boardId) {
      return task;
    }
    throw new ResourceError('task', 404, 'Task was not founded!');
  }

  /**
   * Update task record from db
   * @param boardId - board uuid
   * @param id - task uuid
   * @param body - new task data of record
   * @returns object task \{id, title, order, description, userId, boardId, columnId\}
   */
  update(boardId: UUIDType, id: UUIDType, body: TaskType): TaskType {
    if (!this._tasks.has(id)) {
      throw new ResourceError('task', 404, 'Task was not founded!');
    }
    this._tasks.set(id, body);
    return body;
  }

  /**
   * Delete task record from db
   * @param boardId - board uuid
   * @param id - task uuid
   * @returns returns boolean type of query result
   */
  remove(boardId: UUIDType, id: UUIDType): boolean {
    return this._tasks.delete(id);
  }

  /**
   * Delete all task related with board from db
   * @param boardId - board uuid
   * @returns void
   */
  removeMany(boardId: UUIDType): void {
    const tasks = this._tasks;
    this.getAll(boardId).map(({ id }) => tasks.delete(id));
  }

  /**
   * Find all task the user and nulling userId field in db
   * @param userId - user uuid
   * @returns void
   */
  userNulling(userId: UUIDType): void {
    const tasksMap = this._tasks;
    this.getAll()
      .filter((task) => task.userId === userId)
      .map(({ id }) => {
        const task = tasksMap.get(id) as TaskType;
        task.userId = null;
        return tasksMap.set(id, task as TaskType);
      });
  }
}

export default TaskRepository;
