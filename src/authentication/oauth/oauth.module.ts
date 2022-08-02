import { Module } from '@nestjs/common';

import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { OauthRepository } from './oauth.repository';
import { KakaoStrategy } from './strategy';
import { UsersModule } from '../../users/users.module';
import { TokenModule } from '../token/token.module';

const strategy = [KakaoStrategy];

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [OauthController],
  providers: [OauthService, OauthRepository, ...strategy],
})
export class OauthModule {}
