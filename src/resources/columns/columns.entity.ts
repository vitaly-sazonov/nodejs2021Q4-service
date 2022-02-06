import { BaseEntity, Entity, PrimaryGeneratedColumn, Column as ColumnPg, OneToMany, ManyToOne } from 'typeorm';

import { Task } from '../tasks/tasks.entity';
import { Board } from '../boards/boards.entity';

export interface IColumn {
  id: UUIDType;
  title: string;
  order: number;
}

/**
 * Class Board format.
 */
@Entity('columns')
export class Column extends BaseEntity {
  /** @public uuid record */
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  /** @public title board */
  @ColumnPg()
  title!: string;

  /** @public the order of the column in the list */
  @ColumnPg()
  order!: number;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  board!: Board;

  @ColumnPg({ nullable: true, select: false })
  boardId!: string | null;

  @OneToMany(() => Task, (task) => task.column)
  tasks!: Task[];
}
