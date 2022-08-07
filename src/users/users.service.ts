import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UsersRepository } from './users.repository';
import { UpdateUserRequestDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(data: Prisma.UsersCreateInput) {
    return this.usersRepository.create(data);
  }

  update(userId: number, { gender }: UpdateUserRequestDto) {
    return this.usersRepository.update(userId, { gender });
  }
}
