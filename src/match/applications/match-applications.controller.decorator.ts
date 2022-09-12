import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const matchApplicationsController = () =>
  applyDecorators(
    Controller({ path: '/match', version: ['1'] }),
    ApiTags('매칭 신청 API'),
  );
