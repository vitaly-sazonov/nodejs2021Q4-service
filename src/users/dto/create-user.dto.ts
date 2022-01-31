export class CreateUserDto {
  readonly id!: UUIDType;
  readonly name!: string;
  readonly login!: string;
  readonly password!: string;
}
