import { applyDecorators, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';

import { GetClubsResponseDto } from './dto';

export const ClubsController = () =>
  applyDecorators(
    Controller({ path: '/clubs', version: ['1'] }),
    ApiTags('Clubs'),
  );

export const CreateClub = () =>
  applyDecorators(
    Post('/'),
    JwtAuth(),
    ApiOperation({
      summary: '클럽 생성 API',
    }),
  );

export const GetClubs = () =>
  applyDecorators(
    Get('/'),
    ApiOperation({
      summary: '클럽 리스트 조회 API',
    }),
    ApiOkResponse({
      type: GetClubsResponseDto,
    }),
  );
