import { Connection } from 'typeorm';
import UsersRepo from './user.repository';

import { User, UserType } from './user.model';

const userRepo = new UsersRepo();

/**
 * Get all users via UserRepository
 * @returns array of objects data the user without password field
 */
const getAll = (db: Connection) => userRepo.getAll(db);

/**
 * Add user in db via UserRepository
 * @param user - data user
 * @returns object user without password field \{id, name, login\}
 */
const add = (db: Connection, user: UserType) => userRepo.add(db, user);

/**
 * Get user record by record id from db via UserRepository
 * @param id - user record uuid
 * @returns object user without password field \{id, name, login\}
 */
const getUser = (db: Connection, id: UUIDType) => userRepo.get(db, id);

/**
 * Update user record by record id from db via UserRepository
 * @param id - user record uuid
 * @param body - new user data of record
 * @returns object user without password field \{id, name, login\}
 */
const update = (db: Connection, id: UUIDType, body: User) => userRepo.update(db, id, body);

/**
 * Delete user record by record id from db via UserRepository
 * Nulling the userID field for all related tasks via TaskRepository
 * @param id - user record uuid
 * @returns void
 */
const remove = async (db: Connection, id: UUIDType) => {
  await userRepo.remove(db, id);
};

/**
 * Service of users
 * @returns functions \{ getAll, add, getUser, update, remove \}
 */
export default { getAll, add, getUser, update, remove };
