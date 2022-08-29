import {
  applyDecorators,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuth, Throttler } from '@app/utils/guards';

import { GetClubDetailsResponseDto, GetClubsResponseDto } from './dto';

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
    ApiCreatedResponse({
      schema: {},
    }),
  );

export const GetClubs = () =>
  applyDecorators(
    Get('/'),
    Throttler(),
    ApiOperation({
      summary: '클럽 리스트 조회 API',
    }),
    ApiOkResponse({
      type: GetClubsResponseDto,
    }),
  );

export const GetClubDetails = () =>
  applyDecorators(
    Get('/:clubId/details'),
    Throttler(),
    ApiOperation({
      summary: '클럽 상세 조회 API',
    }),
    ApiOkResponse({
      type: GetClubDetailsResponseDto,
    }),
  );

export const UpdateClub = () =>
  applyDecorators(
    Put('/:clubId'),
    JwtAuth(),
    ApiOperation({
      summary: '클럽 업데이트 API',
    }),
    ApiOkResponse({
      schema: {},
    }),
  );

export const DeleteClub = () =>
  applyDecorators(
    Delete('/:clubId'),
    JwtAuth(),
    ApiOperation({
      summary: '클럽 삭제 API',
    }),
    ApiOkResponse({
      schema: {},
    }),
  );
