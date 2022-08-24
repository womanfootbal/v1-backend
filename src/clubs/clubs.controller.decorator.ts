import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '@app/utils/guards';

export const ClubsController = () =>
  applyDecorators(
    Controller({ path: '/clubs', version: ['1'] }),
    ApiTags('Clubs'),
  );

export const CreateClub = () =>
  applyDecorators(
    Post(),
    JwtAuth(),
    ApiOperation({
      summary: '클럽 생성 API',
    }),
  );
