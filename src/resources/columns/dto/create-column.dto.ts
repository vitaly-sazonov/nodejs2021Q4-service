import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly order!: number;

  @IsUUID()
  @IsNotEmpty()
  readonly boardId!: UUIDType;
}
