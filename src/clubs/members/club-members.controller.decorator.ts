import { applyDecorators, Controller, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '@app/utils/guards';

export const ClubMembersController = () =>
  applyDecorators(
    Controller({ path: '/clubs', version: ['1'] }),
    ApiTags('클럽 멤버'),
  );

export const DelegateClubCaptain = () =>
  applyDecorators(
    Put(''),
    JwtAuth(),
    ApiOperation({
      summary: '클럽 캡틴 위임하기 API',
    }),
  );
