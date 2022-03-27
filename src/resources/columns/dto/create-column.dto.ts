import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ example: 'Done', description: 'Column title' })
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @ApiProperty({ example: '1', description: 'Column order' })
  @IsNumber()
  @IsNotEmpty()
  readonly order!: number;
}
