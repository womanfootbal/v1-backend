import { Global, Module } from '@nestjs/common';
import { JwtModule as Jwt, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    Jwt.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get('ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: 'JwtService',
      useExisting: JwtService,
    },
  ],
  exports: ['JwtService'],
})
export class JwtModule {}
