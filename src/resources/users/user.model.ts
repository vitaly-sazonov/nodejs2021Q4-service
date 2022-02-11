import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Task } from '../tasks/tasks.model';

export type LoginType = { login: string; password: string };
export type UserType = { id: string; name: string; login: string; password: string };
export type UserTypeWithoutPassword = { id: string; name: string; login: string };
/**
 * Class User format.
 */
@Entity('users')
export class User extends BaseEntity {
  /** @public uuid record */

  @PrimaryGeneratedColumn('uuid')
  id!: string;

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
