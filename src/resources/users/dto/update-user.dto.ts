import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: '40af606c-c0bb-47d1-bc20-a2857242cde3', description: 'unique user ID' })
  @IsUUID()
  readonly id!: UUIDType;

  @ApiProperty({ example: 'Vasya', description: 'Username' })
  @IsString()
  readonly name!: string;

  @ApiProperty({ example: 'user001', description: 'Login user' })
  @IsString()
  readonly login!: string;

  @ApiProperty({ example: 'userpass@123', description: 'Password user' })
  @IsString()
  readonly password!: string;
}
