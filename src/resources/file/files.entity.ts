import { BaseEntity, Entity, Unique, Column, PrimaryColumn } from 'typeorm';

@Entity('files')
@Unique(['filename'])
export class File extends BaseEntity {
  /** @public uuid record */

  /** @public filename */
  @PrimaryColumn()
  filename!: string;

  /** @public fileId */
  @Column()
  fileId!: UUIDType;

  @Column()
  fileSize!: number;

  /** @public filename */
  @Column({ nullable: true })
  taskId!: UUIDType;
}
