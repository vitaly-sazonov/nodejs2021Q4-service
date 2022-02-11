export type UserType = { id: string; name: string; login: string; password: string };
export type UserTypeWithoutPassword = { id: string; name: string; login: string };

/**
 * Class User format.
 */
class User {
  /** @public uuid record */
  id: string;
  /** @public name user */
  name: string;
  /** @public login user */
  login: string;
  /** @public password user */
  password: string;

  /**
   * Constructor class User
   * @param object - data user format \{id, name, login, password\}
   * @returns Instance class User
   */
  constructor({ id, name, login, password }: UserType) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Static formating function
   * @param user - instance class User
   * @returns object - truncated data format to \{id, name, login\}
   */
  static toResponse(user: User): UserTypeWithoutPassword {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
