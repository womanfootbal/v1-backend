import { Module } from '@nestjs/common';

import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { OauthRepository } from './oauth.repository';
import { KakaoStrategy } from './strategy';
import { UsersModule } from '../../users/users.module';

const strategy = [KakaoStrategy];

@Module({
  imports: [UsersModule],
  controllers: [OauthController],
  providers: [OauthService, OauthRepository, ...strategy],
})
export class OauthModule {}
