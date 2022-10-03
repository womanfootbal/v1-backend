import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Crypto } from '@app/utils/crypto';
import { PrismaService } from '@app/prisma';
import { UsersService } from '@src/users/users.service';
import { CreateUserRequestDto } from '@src/authentication/auth/dto';

import { AuthError } from './error';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async registerUser({
    email,
    password,
    gender,
  }: CreateUserRequestDto): Promise<void> {
    try {
      const hashedPassword = await Crypto.encrypt(password);
      await this.usersService.create({
        email,
        password: hashedPassword,
        gender,
      });
    } catch (error) {
      if (PrismaService.isPrismaError(error)) {
        throw new ConflictException(AuthError.DUPLICATE_EMAIL);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
