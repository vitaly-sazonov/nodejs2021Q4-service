import { IsString, IsNotEmpty, IsNumber, ValidateIf, IsOptional, IsUUID } from 'class-validator';

export class UpdateTaskDto {
  @IsUUID()
  @IsNotEmpty()
  readonly id!: UUIDType;

  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly order!: number;

  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly userId!: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly boardId!: string | null;

  @IsString()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  readonly columnId!: string;
}
