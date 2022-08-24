import { Clubs, Prisma } from '@prisma/client';

export abstract class IClubsRepository {
  abstract create(
    clubData: Prisma.ClubsCreateInput,
    { userId, nickName }: { userId: number; nickName: string },
  ): Promise<Clubs>;

  abstract findByUserId(userId: number): Promise<Clubs>;
}
