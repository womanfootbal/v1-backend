import { Module } from '@nestjs/common';

import { AccessTokenService } from './access-token.service';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  providers: [AccessTokenService, RefreshTokenService],
  exports: [AccessTokenService, RefreshTokenService],
})
export class TokenModule {}
