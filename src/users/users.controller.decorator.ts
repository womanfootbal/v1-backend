import { applyDecorators, Controller, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';

export const UsersController = () =>
  applyDecorators(
    Controller({ path: '/users', version: ['1'] }),
    ApiTags('Users'),
  );

export const UpdateUser = () =>
  applyDecorators(
    Put('/'),
    JwtAuth(),
    ApiOperation({
      summary: '유저 업데이트 API',
    }),
  );
