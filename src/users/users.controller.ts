import { Body } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';

import {
  UsersController as Controller,
  UpdateUser,
} from './users.controller.decorator';
import { UpdateUserRequestDto } from './dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UpdateUser()
  async updateUser(
    @User() { userId }: UserRequestDto,
    @Body() body: UpdateUserRequestDto,
  ) {
    // test branch
    console.log(userId);
    return this.usersService.update(userId, body);
  }
}
