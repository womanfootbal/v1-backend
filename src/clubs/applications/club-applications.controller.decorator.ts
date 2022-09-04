import { applyDecorators, Controller, Post, Put } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';

export const ClubApplicationsController = () =>
  applyDecorators(
    Controller({ path: '/clubs', version: ['1'] }),
    ApiTags('Club Applications'),
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

export const UpdateClubApplicationStatusToCompleted = () =>
  applyDecorators(
    Put('/applications/:applicationId/approval'),
    JwtAuth(),
    ApiOperation({
      summary: '클럽(멤버) 신청 승인 API',
    }),
    ApiOkResponse({
      schema: {},
    }),
  );

export const UpdateClubApplicationStatusToCancel = () =>
  applyDecorators(
    Put('/applications/:applicationId/canceled'),
    JwtAuth(),
    ApiOperation({
      summary: '클럽(멤버) 신청 취소 API',
    }),
    ApiOkResponse({
      schema: {},
    }),
  );
