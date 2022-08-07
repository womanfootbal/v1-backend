import { Body } from '@nestjs/common';

import {
  UsersController as Controller,
  UpdateUser,
} from './users.controller.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UpdateUser()
  async updateUser(@Body() body: UpdateUserDto) {
    return this.usersService.update(body);
  }
}
