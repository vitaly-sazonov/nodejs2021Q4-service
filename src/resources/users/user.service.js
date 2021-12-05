const UsersRepo = require('./user.repository');

const userRepo = new UsersRepo();

const getAll = () => userRepo.getAll();
const add = (user) => userRepo.add(user);
const getUser = (id) => userRepo.get(id);
const update = (id, body) => userRepo.update(id, body);
const remove = (id) => userRepo.remove(id);

module.exports = { getAll, add, getUser, update, remove };
