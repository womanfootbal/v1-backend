import { ClubMembersEntity } from '@app/prisma/entities';
import { ApiProperty } from '@nestjs/swagger';

export class FindClubMembersResponseDto {
  @ApiProperty({ type: ClubMembersEntity, isArray: true, nullable: true })
  readonly clubMembers: ClubMembersEntity[] | null;

  constructor(partial: Partial<FindClubMembersResponseDto>) {
    Object.assign(this, partial);
  }
}
