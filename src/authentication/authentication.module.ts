import { Module } from '@nestjs/common';

import { OauthModule } from './oauth/oauth.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [OauthModule, TokenModule],
})
export class AuthenticationModule {}
