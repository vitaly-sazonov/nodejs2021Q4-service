import { Connection } from 'typeorm';
import UsersRepo from '../users/user.repository';

import { LoginType } from '../users/user.model';

const userRepo = new UsersRepo();
/**
 * Get user record by record id from db via UserRepository
 * @param id - user record uuid
 * @returns object user without password field \{id, name, login\}
 */
const getToken = (db: Connection, body: LoginType) => userRepo.getToken(db, body);

export default { getToken };
