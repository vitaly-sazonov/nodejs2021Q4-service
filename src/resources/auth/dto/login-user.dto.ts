import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user001', description: 'Login user' })
  @IsString()
  @IsNotEmpty()
  readonly login!: string;

  @ApiProperty({ example: 'userpass@123', description: 'Password user' })
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
