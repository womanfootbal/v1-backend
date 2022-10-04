import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';

import { UsersRepository } from './users.repository';
import { UpdateUserRequestDto } from './dto';
import { UsersError } from './error';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(data: Prisma.UsersUncheckedCreateInput) {
    return this.usersRepository.create(data);
  }

  update(userId: number, { gender }: UpdateUserRequestDto) {
    return this.usersRepository.update(userId, { gender });
  }

  async getUserByEmailWithValidate(email: string): Promise<Users> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !user.status) {
      throw new NotFoundException(UsersError.NOT_FOUND_USER);
    }

    return user;
  }
}
