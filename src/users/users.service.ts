import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(data: Prisma.UsersCreateInput) {
    return this.usersRepository.create(data);
  }
}
