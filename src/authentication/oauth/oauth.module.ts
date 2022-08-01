import { Module } from '@nestjs/common';

import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { OauthRepository } from './oauth.repository';
import { KakaoStrategy } from './strategy';

const strategy = [KakaoStrategy];

@Module({
  controllers: [OauthController],
  providers: [OauthService, OauthRepository, ...strategy],
})
export class OauthModule {}
