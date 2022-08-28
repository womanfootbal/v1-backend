import { Clubs } from '@prisma/client';

import { UpdateClubBodyRequestDto, UpdateClubParamRequestDto } from '../dto';

export interface IFindClubsOptions {
  page: number;
  pageSize: number;
  name?: string;
  activityRegion: string;
}

export interface ICreateClubWithMemberParam {
  userId: number;
  nickName: string;
}

export interface IUpdateClubOptions {
  userId: number;
  updateClubParamRequestDto: UpdateClubParamRequestDto;
  updateClubBodyRequestDto: UpdateClubBodyRequestDto;
}

export type TFindByOptions = [Clubs[], number];
