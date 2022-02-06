import { IsString, IsNotEmpty, ValidateIf, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
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
