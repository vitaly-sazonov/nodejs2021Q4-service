import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ example: 'Done', description: 'Column title' })
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @ApiProperty({ example: '1', description: 'Column order' })
  @IsNumber()
  @IsNotEmpty()
  readonly order!: number;

  @ApiProperty({
    example: '8d3bad56-ad8a-495d-9500-18ae4d1de8dc',
    description: 'ID of the Board to which the belongs Column',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly boardId!: UUIDType;
}
