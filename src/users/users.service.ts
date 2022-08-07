import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(data: Prisma.UsersCreateInput) {
    return this.usersRepository.create(data);
  }

  update({ userId, gender }: UpdateUserDto) {
    return this.usersRepository.update(userId, { gender });
  }
}
