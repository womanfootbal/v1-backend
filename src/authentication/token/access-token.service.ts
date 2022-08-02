import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenService {
  constructor(@Inject('JwtService') private readonly jwtService: JwtService) {}

  generateAccessToken({ userId }: { userId: number }) {
    if (!userId) {
      throw new BadRequestException();
    }
    return this.jwtService.sign({ userId });
  }
}
