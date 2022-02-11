import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { NestedUpdateColumnDto } from '../../columns/dto/nested-update-column.dto';

export class UpdateBoardDto {
  @ApiProperty({ example: '9a111e19-24ec-43e1-b8c4-13776842b8d5', description: 'ID Board' })
  @IsUUID()
  readonly id!: UUIDType;

  @ApiProperty({ example: 'Homework tasks', description: 'Board title' })
  @IsString()
  readonly title!: string;

  @ApiProperty({ type: [NestedUpdateColumnDto] })
  @ValidateNested()
  @Type(() => NestedUpdateColumnDto)
  readonly columns!: NestedUpdateColumnDto[];
}
