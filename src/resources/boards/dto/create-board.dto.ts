import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateNestedColumnDto } from '../../columns/dto/nested-column.dto';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @ValidateNested({ each: true })
  @Type(() => CreateNestedColumnDto)
  readonly columns!: CreateNestedColumnDto[];
}
