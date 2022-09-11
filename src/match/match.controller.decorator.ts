import { applyDecorators, Controller, Get, Post } from '@nestjs/common';

import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuth, Throttler } from '@app/utils/guards';

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

export const GetMatches = () =>
  applyDecorators(
    Get(),
    Throttler(),
    ApiOperation({
      summary: '날짜별 매칭 조회 API',
    }),
  );
