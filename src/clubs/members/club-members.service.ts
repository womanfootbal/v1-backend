import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClubMembers, Role } from '@prisma/client';

import { ClubMembersRepository } from './club-members.repository';
import { ClubMembersError } from './error';
import {
  DelegateCaptainParamRequestDto,
  ResignClubMemberParamRequestDto,
} from './dto';

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

  private async findAndValidateMemberToResign(userId: number, clubId: number) {
    const member = await this.clubMembersRepository.findMemberOfClub(
      userId,
      clubId,
    );

    if (!member || !member.status) {
      throw new NotFoundException(ClubMembersError.NOT_FOUND_MEMBER);
    }
    if (member.role === Role.CAPTAIN) {
      throw new BadRequestException(ClubMembersError.CAPTAIN_CAN_NOT_RESIGN);
    }

    return member;
  }

  async resignClubMember(
    userId: number,
    { clubId }: ResignClubMemberParamRequestDto,
  ) {
    const { id } = await this.findAndValidateMemberToResign(userId, clubId);

    return this.clubMembersRepository.deleteMember(id);
  }
}
