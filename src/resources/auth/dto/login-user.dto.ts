import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  readonly login!: string;

  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
