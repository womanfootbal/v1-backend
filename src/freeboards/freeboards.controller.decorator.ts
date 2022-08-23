import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const UserController = () =>
  applyDecorators(
    Controller({ path: '/freeboards', version: ['1'] }),
    ApiTags('freeboards'),
  );
