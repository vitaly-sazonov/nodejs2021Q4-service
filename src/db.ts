import UserType from './resources/users/user.model';
import BoardType from './resources/boards/board.model';
import TaskType from './resources/tasks/tasks.model';

const db = {
  users: new Map<UUIDType, UserType>(),
  boards: new Map<UUIDType, BoardType>(),
  tasks: new Map<UUIDType, TaskType>(),
};

export default db;
