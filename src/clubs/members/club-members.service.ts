import { Injectable } from '@nestjs/common';

import { ClubMembersRepository } from './club-members.repository';

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

  create({  }: { clubId: number, userId: number }) {

  }
}
