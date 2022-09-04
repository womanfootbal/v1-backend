import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const FreeBoardsLikesController = () =>
  applyDecorators(
    Controller({ path: '/free-boards-likes', version: ['1'] }),
    ApiTags('free-boards-likes'),
  );
