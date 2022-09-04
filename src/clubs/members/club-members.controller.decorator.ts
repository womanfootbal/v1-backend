import { applyDecorators, Controller, Delete, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';

export const ClubMembersController = () =>
  applyDecorators(
    Controller({ path: '/clubs', version: ['1'] }),
    ApiTags('Club Member'),
  );

export const DelegateClubCaptain = () =>
  applyDecorators(
    Put('/:clubId/members/:memberId'),
    JwtAuth(),
    ApiOperation({
      summary: '클럽 캡틴 위임하기 API',
    }),
    ApiOkResponse({
      schema: {},
    }),
  );

export const ResignClubMember = () =>
  applyDecorators(
    Delete('/:clubId/members/resign'),
    JwtAuth(),
    ApiOperation({
      summary: '클럽 멤버 탈퇴 API',
    }),
    ApiOkResponse({
      schema: {},
    }),
  );
