import { Body } from '@nestjs/common';

import {
  AuthController as Controller,
  RegisterUser,
} from './auth.controller.decorator';
import { AuthService } from './auth.service';
import { CreateUserRequestDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RegisterUser()
  async registerUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    await this.authService.registerUser(createUserRequestDto);
    return null;
  }
}
