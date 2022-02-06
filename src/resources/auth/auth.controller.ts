import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  // @Post('/registration')
  // registration(@Body() userDto: CreateUserDto) {
  //   return this.authService.registration(userDto);
  // }
}
