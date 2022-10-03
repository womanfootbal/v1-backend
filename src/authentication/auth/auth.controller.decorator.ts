import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export const AuthController = () =>
  applyDecorators(
    Controller({ path: '/auth', version: ['1'] }),
    ApiTags('Auth'),
  );

export const RegisterUser = () =>
  applyDecorators(
    Post('/register'),
    ApiOperation({
      summary: '회원가입 API',
    }),
  );
