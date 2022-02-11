import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class NestedUpdateColumnDto {
  @ApiProperty({ example: '08cc10f4-1aeb-4cce-9793-9fea8313b592', description: 'ID Column' })
  @IsUUID()
  readonly id!: UUIDType;

  @ApiProperty({ example: 'Done', description: 'Column title' })
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @ApiProperty({ example: '1', description: 'Column order' })
  @IsNumber()
  @IsNotEmpty()
  readonly order!: number;
}
