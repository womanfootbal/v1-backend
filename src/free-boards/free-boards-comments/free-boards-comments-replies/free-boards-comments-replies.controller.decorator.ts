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

export const FreeBoardsCommentsRepliesController = () =>
  applyDecorators(
    Controller({ path: '/free-boards-comments-replies', version: ['1'] }),
    ApiTags('free-boards-comments-replies'),
  );

export const CreateFreeBoardCommentReplie = () =>
  applyDecorators(
    Post('/'),
    JwtAuth(),
    ApiOperation({
      summary: '대댓글 생성 API',
    }),
  );

export const GetFreeBoardCommentReplies = () =>
  applyDecorators(
    Get('/'),
    ApiOperation({
      summary: '대댓글 리스트 조회 API',
    }),
  );

export const GetFreeBoardCommentReplie = () =>
  applyDecorators(
    Get('/:freeBoardCommentReplieId'),
    ApiOperation({
      summary: '대댓글 상세 조회 API',
    }),
  );

export const UpdateFreeBoardsCommentsReplies = () =>
  applyDecorators(
    Put('/:freeBoardCommentReplieId'),
    JwtAuth(),
    ApiOperation({
      summary: '대댓글 업데이트 API',
    }),
  );

export const DeleteFreeBoardsCommentsReplies = () =>
  applyDecorators(
    Delete('/:freeBoardCommentReplieId'),
    JwtAuth(),
    ApiOperation({
      summary: '대댓글 삭제 API',
    }),
  );
