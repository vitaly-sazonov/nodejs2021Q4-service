const uuid = require('uuid');

const Task = require('./tasks.model');
const db = require('../../db');

class TaskRepository {
  constructor() {
    this._tasks = db.tasks;
  }

  getAll(boardId) {
    let tasks;
    tasks = Array.from(this._tasks.values());
    if (boardId) {
      tasks = tasks.filter((task) => task.boardId === boardId);
    }
    return tasks;
  }

  add(boardId, task) {
    const id = uuid.v4();
    const instance = new Task({ ...task, id, boardId });
    this._tasks.set(instance.id, instance);
    return Task.toResponse(instance);
  }

  get(boardId, id) {
    const task = this._tasks.get(id);

    if (task && task.boardId === boardId) {
      return task;
    }

    throw new Error('Task was not founded!');
  }

  update(boardId, id, body) {
    if (!this._tasks.has(id)) {
      throw new Error('Task was not founded!');
    }
    return this._tasks.set(id, body);
  }

  remove(boardId, id) {
    return this._tasks.delete(id);
  }

  removeMany(boardId) {
    const tasks = this._tasks;
    this.getAll(boardId).map(({ id }) => tasks.delete(id));
  }

  userNulling(userId) {
    const tasksMap = this._tasks;
    this.getAll()
      .filter((task) => task.userId === userId)
      .map(({ id }) => {
        const task = tasksMap.get(id);
        task.userId = null;
        return tasksMap.set(id, task);
      });
  }
}

module.exports = TaskRepository;
