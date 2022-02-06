import { IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @IsUUID()
  readonly id!: UUIDType;

  @IsString()
  readonly name!: string;

  @IsString()
  readonly login!: string;

  @IsString()
  readonly password!: string;
}
