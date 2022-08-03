import { applyDecorators, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { KakaoAuth } from '@app/utils/guards';

export const OauthController = () =>
  applyDecorators(Controller({ path: '/oauth', version: ['1'] }), ApiTags());

export const KakaoLogin = () =>
  applyDecorators(
    Get('/kakao'),
    KakaoAuth(),
    ApiOperation({
      summary: '카카오 로그인 API',
    }),
  );

export const KakaoCallback = () =>
  applyDecorators(
    Get('/kakao/callback'),
    KakaoAuth(),
    ApiOperation({ summary: '카카오 콜백' }),
  );
