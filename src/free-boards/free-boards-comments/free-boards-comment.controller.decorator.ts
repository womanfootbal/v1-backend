import { JwtAuth } from '@app/utils/guards';
import { applyDecorators, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export const FreeBoardsCommentsController = () =>
  applyDecorators(
    Controller({ path: '/free-boards-comments', version: ['1'] }),
    ApiTags('free-boards-comments'),
  );

export const CreateFreeBoard = () =>
    applyDecorators(
      Post('/'),
      JwtAuth(),
      ApiOperation({
        summary: '게시글 생성 API',
      })
    )

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
