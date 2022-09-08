import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const MatchController = () =>
  applyDecorators(
    Controller({ path: '/match', version: ['1'] }),
    ApiTags('Match'),
  );
