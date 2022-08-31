import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

import { ClubMembersRepository } from './club-members.repository';
import { ClubMembersError } from './error';

@Injectable()
export class ClubMembersService {
  constructor(private readonly clubMembersRepository: ClubMembersRepository) {}

  async isExistMemberByClub(userId: number, clubId: number): Promise<boolean> {
    const members = await this.clubMembersRepository.findMemberOfClub(
      userId,
      clubId,
    );

    return !!members;
  }

  async validateIsCaptain(userId: number, clubId: number): Promise<void> {
    const result = await this.clubMembersRepository.findMemberOfClub(
      userId,
      clubId,
    );

    const isCaptain = result && result.role === Role.CAPTAIN;
    if (!isCaptain) {
      throw new ForbiddenException(ClubMembersError.NOT_CAPTAIN);
    }
  }
}
