import { Clubs } from '@prisma/client';

export interface IFindClubsOptions {
  page: number;
  pageSize: number;
  name?: string;
  activityRegion: string;
}

export type TFindByOptions = [Clubs[], number];
