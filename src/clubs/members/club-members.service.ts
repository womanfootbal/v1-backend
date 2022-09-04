import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClubMembers, Role } from '@prisma/client';

import { ClubMembersRepository } from './club-members.repository';
import { ClubMembersError } from './error';
import { DelegateCaptainParamRequestDto } from './dto';

@Injectable()
export class ClubMembersService {
  constructor(private readonly clubMembersRepository: ClubMembersRepository) {}

  async isExistMember(userId: number, clubId: number): Promise<boolean> {
    const members = await this.clubMembersRepository.findMemberOfClub(
      userId,
      clubId,
    );

    return !!members;
  }

  async findAndValidateIsCaptain(
    userId: number,
    clubId: number,
  ): Promise<ClubMembers> {
    const result = await this.clubMembersRepository.findMemberOfClub(
      userId,
      clubId,
    );

    const isCaptain = result && result.role === Role.CAPTAIN;
    if (!isCaptain) {
      throw new ForbiddenException(ClubMembersError.NOT_CAPTAIN);
    }

    return result;
  }

  private async validateIsMemberOfClub(id: number, clubId: number) {
    const member = await this.clubMembersRepository.findById(id);
    if (!member || !member.status) {
      throw new NotFoundException(ClubMembersError.NOT_FOUND_MEMBER);
    }
    if (member.clubId !== clubId) {
      throw new ForbiddenException(ClubMembersError.NOT_MEMBER_OF_CLUB);
    }
  }

  async delegateCaptain(
    userId: number,
    { clubId, memberId }: DelegateCaptainParamRequestDto,
  ) {
    const { id: captainMemberId } = await this.findAndValidateIsCaptain(
      userId,
      clubId,
    );
    await this.validateIsMemberOfClub(memberId, clubId);

    return this.clubMembersRepository.updateCaptainStatusToMember(
      captainMemberId,
      memberId,
    );
  }
}
