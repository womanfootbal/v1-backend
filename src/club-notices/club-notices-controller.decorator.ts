import { JwtAuth } from '@app/utils/guards';
import { applyDecorators, Controller, Post, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export const ClubNoticesController = () =>
  applyDecorators(
    Controller({ path: 'club-notices', version: ['1'] }),
    ApiTags('club-notices'),
  );

export const CreateClubNotice = () =>
  applyDecorators(
    Post('/'),
    JwtAuth(),
    ApiOperation({
      summary: '클럽 공지사항 생성 API',
    }),
  );

export const GetClubNotices = () =>
  applyDecorators(
    Get('/'),
    ApiOperation({
      summary: '클럽 공지사항 조회 API',
    }),
  );
