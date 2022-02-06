import { IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { NestedUpdateColumnDto } from '../../columns/dto/nested-update-column.dto';

export class UpdateBoardDto {
  @IsUUID()
  readonly id!: UUIDType;

  @IsString()
  readonly title!: string;

  @ValidateNested()
  @Type(() => NestedUpdateColumnDto)
  readonly columns!: NestedUpdateColumnDto[];
}
