import { JwtAuth } from '@app/utils/guards';
import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

export const FreeBoardsLikesController = () =>
  applyDecorators(
    Controller({ path: '/free-boards-likes', version: ['1'] }),
    ApiTags('free-boards-likes'),
  );

export const CreateFreeBoardsLikes = () =>
  applyDecorators(
    Post('/'),
    JwtAuth(),
    ApiOperation({
      summary: '게시글 좋아요 API',
    }),
  );
