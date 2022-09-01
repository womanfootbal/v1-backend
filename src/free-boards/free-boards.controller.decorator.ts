import { JwtAuth } from '@app/utils/guards';
import {
  applyDecorators,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export const FreeBoardsController = () =>
  applyDecorators(
    Controller({ path: '/free-boards', version: ['1'] }),
    ApiTags('free-boards'),
  );

export const CreateFreeBoard = () =>
  applyDecorators(
    Post('/'),
    JwtAuth(),
    ApiOperation({
      summary: '게시글 생성 API',
    }),
  );

export const GetFreeBoards = () =>
  applyDecorators(
    Get('/'),
    ApiOperation({
      summary: '게시글 리스트 조회',
    }),
  );

export const GetFreeBoard = () =>
  applyDecorators(
    Get('/:freeBoardId'),
    ApiOperation({
      summary: '게시글 상세 조회',
    }),
  );

export const UpdateFreeBoards = () =>
  applyDecorators(
    Put('/:freeBoardId'),
    JwtAuth(),
    ApiOperation({
      summary: '게시글 업데이트 API',
    }),
  );

export const DeleteFreeBoards = () =>
  applyDecorators(
    Delete('/:id'),
    JwtAuth(),
    ApiOperation({
      summary: '게시글 삭제 API',
    }),
  );
