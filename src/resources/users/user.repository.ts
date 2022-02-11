import { randomUUID } from 'crypto';
import User, { UserTypeWithoutPassword, UserType } from './user.model';
import { ResourceError } from '../../common/errors';

import db from '../../db';

/**
 * Class UserRepository for accessing User data
 */
class UserRepository {
  /** @internal _users - reference to simulate base */
  _users;

  /**
   * Constructor class UserRepository
   * @returns Instance class UserRepository
   */
  constructor() {
    this._users = db.users;
  }

  /**
   * Get all users from database
   * @returns array of objects data the user without password field
   */
  getAll(): Array<UserTypeWithoutPassword> {
    const arrayUsers = Array.from(this._users.values());
    return arrayUsers.map((user) => User.toResponse(user));
  }

  /**
   * Add user in db
   * @param user - data user \{name, login, password\}
   * @returns object user without password field \{id, name, login\}
   */
  add(user: User): UserTypeWithoutPassword {
    const id = randomUUID();
    const instance = new User({ ...user, id });
    this._users.set(instance.id, instance);
    return User.toResponse(instance);
  }

  /**
   * Get user record by id from db
   * @param id - user record uuid
   * @returns object user without password field \{id, name, login\}
   */
  get(id: UUIDType): UserTypeWithoutPassword {
    if (!this._users.has(id)) {
      throw new ResourceError('user', 404, 'User was not founded!');
    }
    const user = this._users.get(id);
    return User.toResponse(user as User);
  }

  /**
   * Update user record by id from db
   * @param id - user record uuid
   * @param body - new user data of record
   * @returns object user without password field \{id, name, login\}
   */
  update(id: UUIDType, body: UserType): UserTypeWithoutPassword {
    if (!this._users.has(id)) {
      throw new ResourceError('user', 404, 'User was not founded!');
    }
    this._users.set(id, body);
    return User.toResponse(body);
  }

  /**
   * Delete user record by id from db
   * @param id - user record uuid
   * @returns returns boolean type of query result
   */
  remove(id: UUIDType) {
    return this._users.delete(id);
  }
}

export default UserRepository;
