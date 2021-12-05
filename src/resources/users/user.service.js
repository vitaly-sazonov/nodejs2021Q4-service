const UsersRepo = require('./user.repository');
const TasksRepo = require('../tasks/tasks.repository');

const userRepo = new UsersRepo();
const taskRepo = new TasksRepo();

const getAll = () => userRepo.getAll();
const add = (user) => userRepo.add(user);
const getUser = (id) => userRepo.get(id);
const update = (id, body) => userRepo.update(id, body);
const remove = (id) => {
  userRepo.remove(id);
  taskRepo.userNulling(id);
};

module.exports = { getAll, add, getUser, update, remove };
