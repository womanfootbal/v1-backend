import { JwtAuth } from '@app/utils/guards';
import { applyDecorators, Controller, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export const FreeBoardsController = () =>
  applyDecorators(
    Controller({ path: '/free-boards', version: ['1'] }),
    ApiTags('free-boards'),
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
