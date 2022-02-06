import { IsNumber, IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class NestedUpdateColumnDto {
  @IsUUID()
  readonly id!: UUIDType;

  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly order!: number;
}
