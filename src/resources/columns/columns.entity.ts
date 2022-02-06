import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: '08cc10f4-1aeb-4cce-9793-9fea8313b592', description: 'ID Column' })
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  /** @public title board */
  @ApiProperty({ example: 'Done', description: 'Column title' })
  @ColumnPg()
  title!: string;

  /** @public the order of the column in the list */
  @ApiProperty({ example: '1', description: 'Column order' })
  @ColumnPg()
  order!: number;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  board!: Board;

  @ApiProperty({
    example: '8d3bad56-ad8a-495d-9500-18ae4d1de8dc',
    description: 'ID of the Board to which the belongs Column',
  })
  @ColumnPg({ nullable: true, select: false })
  boardId!: string | null;

  @OneToMany(() => Task, (task) => task.column)
  tasks!: Task[];
}
