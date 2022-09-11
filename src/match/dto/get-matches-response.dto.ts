import { ApiProperty } from '@nestjs/swagger';

import { MatchesEntity } from '@app/prisma/entities';

export class GetMatchesResponseDto {
  @ApiProperty({ type: MatchesEntity, isArray: true })
  matches: MatchesEntity[] | null;

  constructor(partial: Partial<GetMatchesResponseDto>) {
    Object.assign(this, partial);
  }
}
