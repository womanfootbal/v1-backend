import { OauthProvider } from '@prisma/client';

export interface IOauth {
  oauth: {
    id: string;
    isMale: boolean;
    provider: OauthProvider;
    userId?: number;
  };
  isCreate: boolean;
}

export interface IGenerateAccessTokenAndRefreshToken {
  accessToken: string;
  refreshToken: string;
}
