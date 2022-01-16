import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Task } from '../tasks/tasks.model';

export type ColumnType = { id: string; title: string; order: number };
export type BoardType = { id: string; title: string; columns: ColumnType[] };

/**
 * Class Board format.
 */
@Entity('boards')
export class Board extends BaseEntity {
  /** @public uuid record */
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** @public title board */
  @Column()
  title!: string;

  /** @public array of objects the column */
  @Column({ type: 'json' })
  columns: ColumnType[] = [];

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];
}
