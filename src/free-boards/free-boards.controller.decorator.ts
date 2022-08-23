import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const FreeBoardsController = () =>
  applyDecorators(
    Controller({ path: '/free-boards', version: ['1'] }),
    ApiTags('free-boards'),
  );
