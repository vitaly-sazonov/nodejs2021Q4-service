import { Connection } from 'typeorm';

import { Task, TaskType } from './tasks.model';
import { ResourceError } from '../../common/errors';
/**
 * Class TaskRepository for accessing Task data
 */
class TaskRepository {
  /**
   * Get all tasks or all tasks of board from database
   * @param boardId - board uuid
   * @returns array of objects data the task
   */
  async getAll(db: Connection, boardId?: UUIDType): Promise<TaskType[]> {
    const arrayTasks = await db.getRepository(Task).find({ where: { boardId } });
    return arrayTasks;
  }

  /**
   * Add task in db
   * @param boardId - board uuid
   * @param task - data task \{title, order, description, userId, boardId, columnId\}
   * @returns object - data format to \{id, title, order, description, userId, boardId, columnId\}
   */
  async add(db: Connection, boardId: UUIDType, task: TaskType): Promise<TaskType> {
    const modelTask = db.getRepository(Task).create({ ...task, boardId });
    await modelTask.save();
    return modelTask;
  }

  /**
   * Get task record from db
   * @param boardId - board uuid
   * @param id - task uuid
   * @returns instance Task
   */
  async get(db: Connection, boardId: UUIDType, id: UUIDType): Promise<TaskType> {
    const task = await db.getRepository(Task).findOne({ where: { id, boardId } });

    if (task) {
      return task;
    }
    // console.log('task.ERROR>>>>', '\n\n\n');
    throw new ResourceError('task', 404, 'Task was not founded!');
  }

  /**
   * Update task record from db
   * @param boardId - board uuid
   * @param id - task uuid
   * @param body - new task data of record
   * @returns object task \{id, title, order, description, userId, boardId, columnId\}
   */
  async update(db: Connection, boardId: UUIDType, id: UUIDType, body: TaskType): Promise<TaskType> {
    const task = (await db.getRepository(Task).findOne({ where: { id, boardId } })) as Task;
    if (!task) {
      throw new ResourceError('task', 404, 'Task was not founded!');
    }

    task.title = body.title;
    task.order = body.order;
    task.description = body.description;
    task.userId = body.userId;
    task.boardId = body.boardId;
    task.columnId = body.columnId;
    const data = await task.save();
    return data;
  }

  /**
   * Delete task record from db
   * @param boardId - board uuid
   * @param id - task uuid
   * @returns returns boolean type of query result
   */
  async remove(db: Connection, boardId: UUIDType, id: UUIDType): Promise<boolean> {
    const task = (await db.getRepository(Task).findOne({ where: { id } })) as Task;
    await task.remove();
    return true;
  }
}

export default TaskRepository;
