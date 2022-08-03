import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IPayload } from '@shared/type';

@Injectable()
export class AccessTokenService {
  constructor(@Inject('JwtService') private readonly jwtService: JwtService) {}

  generateAccessToken({ userId }: IPayload) {
    if (!userId) {
      throw new BadRequestException();
    }
    return this.jwtService.sign({ userId });
  }
}
