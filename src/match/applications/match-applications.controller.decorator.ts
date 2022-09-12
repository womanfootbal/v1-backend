import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '@app/utils/guards';

export const MatchApplicationsController = () =>
  applyDecorators(
    Controller({ path: '/match', version: ['1'] }),
    ApiTags('Match Application'),
  );

export const CreateMatchApplications = () =>
  applyDecorators(
    Post('/applications'),
    JwtAuth(),
    ApiOperation({
      summary: '매칭 신청 API',
    }),
    ApiCreatedResponse({
      schema: {},
    }),
  );
