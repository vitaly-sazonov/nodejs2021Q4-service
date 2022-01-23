import { Connection } from 'typeorm';

import jwt = require('jsonwebtoken');

import { User, UserTypeWithoutPassword, UserType, LoginType } from './user.model';

import { ResourceError } from '../../common/errors';

import { genHashPassword } from '../../common/authenticate';

/**
 * Class UserRepository for accessing User data
 */
class UserRepository {
  /**
   * Get all users from database
   * @returns array of objects data the user without password field
   */
  async getAll(db: Connection): Promise<UserTypeWithoutPassword[]> {
    const userRepo = db.getRepository(User);
    const arrayUsers = await userRepo.find({ select: ['id', 'name', 'login'] });
    return arrayUsers;
  }

  /**
   * Add user in db
   * @param user - data user \{name, login, password\}
   * @returns object user without password field \{id, name, login\}
   */
  async add(db: Connection, user: UserType): Promise<UserTypeWithoutPassword> {
    let { password } = user;
    password = await genHashPassword(password);
    const modelUser = db.getRepository(User).create({ ...user, password });
    await modelUser.save();
    const { id, name, login } = modelUser;
    return { id, name, login };
  }

  /**
   * Get user record by id from db
   * @param id - user record uuid
   * @returns object user without password field \{id, name, login\}
   */
  async get(db: Connection, id: UUIDType): Promise<UserTypeWithoutPassword> {
    const userRepo = db.getRepository(User);
    const user = await userRepo.findOne({ select: ['id', 'name', 'login'], where: { id } });
    if (!user) {
      throw new ResourceError('user', 404, 'User was not founded!');
    }
    return user as UserTypeWithoutPassword;
  }

  /**
   * Update user record by id from db
   * @param id - user record uuid
   * @param body - new user data of record
   * @returns object user without password field \{id, name, login\}
   */
  async update(db: Connection, id: UUIDType, body: UserType): Promise<UserTypeWithoutPassword> {
    const user = (await db.getRepository(User).findOne({ where: { id } })) as User;
    if (!user) {
      throw new ResourceError('user', 404, 'User was not founded!');
    }

    const password = await genHashPassword(body.password);

    user.name = body.name;
    user.login = body.login;
    user.password = password;
    const data = await user.save();
    return data;
  }

  /**
   * Delete user record by id from db
   * @param id - user record uuid
   * @returns returns boolean type of query result
   */
  async remove(db: Connection, id: UUIDType): Promise<void> {
    const user = (await db.getRepository(User).findOne({ where: { id } })) as User;
    await user.remove();
  }

  async getToken(db: Connection, body: LoginType): Promise<string> {
    const userRepo = db.getRepository(User);
    const user = await userRepo.findOne({ select: ['id', 'password'], where: { login: body.login } });
    if (!user) {
      throw new ResourceError('user', 403, 'User was not founded!');
    }
    const match = await bcrypt.compare(body.password, user.password);
    if (match) {
      throw new ResourceError('user', 403, 'User was not founded!');
    }

    return jwt.sign({ userId: user.id, login: body.login }, process.env.JWT_SECRET_KEY as string);
  }
}

export default UserRepository;
