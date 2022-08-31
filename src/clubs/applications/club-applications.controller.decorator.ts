import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';

export const ClubApplicationsController = () =>
  applyDecorators(
    Controller({ path: '/clubs', version: ['1'] }),
    ApiTags('클럽 신청'),
  );

export const CreateClubApplications = () =>
  applyDecorators(
    Post('/applications'),
    JwtAuth(),
    ApiOperation({
      summary: '클럽(멤버) 신청 API',
    }),
    ApiCreatedResponse({
      schema: {},
    }),
  );
