import { Module } from '@nestjs/common';

import { OauthModule } from './oauth/oauth.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, OauthModule, TokenModule],
})
export class AuthenticationModule {}
