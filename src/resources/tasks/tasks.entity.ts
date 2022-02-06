import { BaseEntity, Entity, PrimaryGeneratedColumn, Column as ColumnPg, JoinColumn, ManyToOne } from 'typeorm';

import { Column } from '../columns/columns.entity';
import { Board } from '../boards/boards.entity';
import { User } from '../users/users.entity';

export interface ITask {
  id: UUIDType;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  board: string;
  boardId: string | null;
  columnId: string | null;
}

@Entity('tasks')
export class Task extends BaseEntity {
  /** @public record uuid */
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  /** @public title column */
  @ColumnPg()
  title!: string;

  /** @public the order of the task in the list */
  @ColumnPg()
  order!: number;

  /** @public task description */
  @ColumnPg()
  description!: string;

  /** @public user uuid */
  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user!: string;

  /** @public user uuid */
  @ColumnPg({ nullable: true })
  userId!: string | null;

  /** @public board uuid */
  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board!: string;

  @ColumnPg({ nullable: true })
  boardId!: string | null;

  @ManyToOne(() => Column, (column) => column.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'columnId' })
  column!: string;

  /** @public column uuid */
  @ColumnPg({ nullable: true })
  columnId!: string;
}
