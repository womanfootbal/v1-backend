import { Module } from '@nestjs/common';

import { UsersModule } from '@src/users/users.module';
import { TokenModule } from '@src/authentication/token/token.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TokenModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
