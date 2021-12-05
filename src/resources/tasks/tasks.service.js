const TasksRepo = require('./tasks.repository');

const taskRepo = new TasksRepo();

const getAll = (boardId) => taskRepo.getAll(boardId);
const add = (boardId, task) => taskRepo.add(boardId, task);
const getTask = (boardId, id) => taskRepo.get(boardId, id);
const update = (boardId, id, body) => taskRepo.update(boardId, id, body);
const remove = (boardId, id) => taskRepo.remove(boardId, id);

module.exports = { getAll, add, getTask, update, remove };
