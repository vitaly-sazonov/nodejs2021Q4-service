import BoardsRepo from './board.repository';
import TasksRepo from '../tasks/tasks.repository';

const boardRepo = new BoardsRepo();
const taskRepo = new TasksRepo();

const getAll = () => boardRepo.getAll();
const add = (task) => boardRepo.add(task);
const getBoard = (id) => boardRepo.get(id);
const update = (id, body) => boardRepo.update(id, body);
const remove = (id) => {
  taskRepo.removeMany(id);
  boardRepo.remove(id);
};

export default { getAll, add, getBoard, update, remove };
