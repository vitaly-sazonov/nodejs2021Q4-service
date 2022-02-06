import { BaseEntity, Entity, PrimaryGeneratedColumn, Column as ColumnPg, OneToMany } from 'typeorm';

import { Task } from '../tasks/tasks.entity';
import { Column } from '../columns/columns.entity';

import { CreateNestedColumnDto } from '../columns/dto/nested-column.dto';

export interface IColumn {
  id: UUIDType;
  title: string;
  order: number;
}
export interface IBoard {
  id: UUIDType;
  title: string;
  columns: CreateNestedColumnDto[];
}

/**
 * Class Board format.
 */
@Entity('boards')
export class Board extends BaseEntity {
  /** @public uuid record */
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  /** @public title board */
  @ColumnPg()
  title!: string;

  /** @public array of objects the column */
  @OneToMany(() => Column, (column) => column.board)
  columns!: CreateNestedColumnDto[];

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];
}
