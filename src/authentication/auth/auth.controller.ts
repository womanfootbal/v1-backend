import { Body } from '@nestjs/common';

import {
  AuthController as Controller,
  RegisterUser,
  LoginUser,
} from './auth.controller.decorator';
import { AuthService } from './auth.service';
import {
  CreateUserRequestDto,
  LoginUserRequestDto,
  LoginUserResponseDto,
} from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RegisterUser()
  async registerUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    await this.authService.registerUser(createUserRequestDto);
    return null;
  }

  @LoginUser()
  async loginUser(@Body() loginUserRequestDto: LoginUserRequestDto) {
    const result = await this.authService.loginUser(loginUserRequestDto);

    return new LoginUserResponseDto(result);
  }
}
