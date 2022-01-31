import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

import { Board } from '../boards/board.model';
import { User } from '../users/user.model';

export type TaskType = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  board: string;
  boardId: string;
  columnId: string;
};

@Entity('tasks')
export class Task extends BaseEntity {
  /** @public record uuid */
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** @public title column */
  @Column()
  title!: string;

  /** @public the order of the task in the list */
  @Column()
  order!: number;

  /** @public task description */
  @Column()
  description!: string;

  /** @public user uuid */
  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user!: string;

  /** @public user uuid */
  @Column({ nullable: true })
  userId!: string | null;

  /** @public board uuid */
  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board!: string;

  @Column()
  boardId!: string;

  /** @public board uuid */
  @Column({ nullable: true })
  columnId!: string;
}
