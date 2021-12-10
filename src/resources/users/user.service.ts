import UsersRepo from './user.repository';
import TasksRepo from '../tasks/tasks.repository';

import User, { UserType } from './user.model';

const userRepo = new UsersRepo();
const taskRepo = new TasksRepo();

/**
 * Get all users via UserRepository
 * @returns array of objects data the user without password field
 */
const getAll = () => userRepo.getAll();

/**
 * Add user in db via UserRepository
 * @param user - data user
 * @returns object user without password field \{id, name, login\}
 */
const add = (user: User) => userRepo.add(user);

/**
 * Get user record by record id from db via UserRepository
 * @param id - user record uuid
 * @returns object user without password field \{id, name, login\}
 */
const getUser = (id: UUIDType) => userRepo.get(id);

/**
 * Update user record by record id from db via UserRepository
 * @param id - user record uuid
 * @param body - new user data of record
 * @returns object user without password field \{id, name, login\}
 */
const update = (id: UUIDType, body: UserType) => userRepo.update(id, body);

/**
 * Delete user record by record id from db via UserRepository
 * Nulling the userID field for all related tasks via TaskRepository
 * @param id - user record uuid
 * @returns void
 */
const remove = (id: UUIDType): void => {
  userRepo.remove(id);
  taskRepo.userNulling(id);
};

/**
 * Service of users
 * @returns functions \{ getAll, add, getUser, update, remove \}
 */
export default { getAll, add, getUser, update, remove };
