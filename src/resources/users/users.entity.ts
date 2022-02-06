import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Task } from '../tasks/tasks.entity';

export interface ILogin {
  login: string;
  password: string;
}
export interface IUser {
  name: string;
  login: string;
  password: string;
}
export interface IUserNoId {
  id: UUIDType;
  name: string;
  login: string;
}
/**
 * Class User format.
 */
@Entity('users')
@Unique(['login'])
export class User extends BaseEntity {
  /** @public uuid record */

  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  /** @public name user */
  @Column()
  name!: string;

  /** @public login user */
  @Column()
  login!: string;

  /** @public password user */
  @Column()
  password!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: string;
}
