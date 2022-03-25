import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({ example: 'Homework tasks', description: 'Board title' })
  @IsString()
  readonly title!: string;
}
