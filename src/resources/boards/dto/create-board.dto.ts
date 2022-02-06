import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateNestedColumnDto } from '../../columns/dto/nested-column.dto';

export class CreateBoardDto {
  @ApiProperty({ example: 'Homework tasks', description: 'Board title' })
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @ApiProperty({ type: [CreateNestedColumnDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateNestedColumnDto)
  readonly columns!: CreateNestedColumnDto[];
}
