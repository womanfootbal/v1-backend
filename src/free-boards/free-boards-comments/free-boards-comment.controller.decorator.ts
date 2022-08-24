import { JwtAuth } from '@app/utils/guards';
import { applyDecorators, Controller, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export const FreeBoardsCommentsController = () =>
  applyDecorators(
    Controller({ path: '/free-boards-comments', version: ['1'] }),
    ApiTags('free-boards-comments'),
  );

export const UpdateFreeBoardsComments = () =>
  applyDecorators(
    Put('/:freeBoardCommentId'),
    JwtAuth(),
    ApiOperation({
      summary: '게시글 댓글 업데이트 API',
    }),
  );

export const DeleteFreeBoardsComments = () =>
  applyDecorators(
    Delete('/:id'),
    JwtAuth(),
    ApiOperation({
      summary: '게시글 댓글 삭제 API',
    }),
  );
