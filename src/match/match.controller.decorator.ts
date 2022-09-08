import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '@app/utils/guards';

export const MatchController = () =>
  applyDecorators(
    Controller({ path: '/match', version: ['1'] }),
    ApiTags('Match'),
  );

export const CreateMatch = () =>
  applyDecorators(
    Post(),
    JwtAuth(),
    ApiOperation({
      summary: '매칭 생성 API',
    }),
    ApiCreatedResponse({
      schema: {},
    }),
  );
