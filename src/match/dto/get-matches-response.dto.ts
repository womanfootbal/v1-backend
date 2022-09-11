import { MatchesEntity } from '@app/prisma/entities';

export class GetMatchesResponseDto {
  matches: MatchesEntity[] | null;

  constructor(partial: Partial<GetMatchesResponseDto>) {
    Object.assign(this, partial);
  }
}
