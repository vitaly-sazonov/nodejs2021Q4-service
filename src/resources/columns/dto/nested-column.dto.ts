import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNestedColumnDto {
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly order!: number;
}
