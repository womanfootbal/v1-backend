import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { IPayload } from '@shared/type';

@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject('JwtService') private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateRefreshToken(payload: IPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
      expiresIn: this.configService.get<string>(
        'REFRESH_TOKEN_EXPIRATION_TIME',
      ),
    });
  }
}
