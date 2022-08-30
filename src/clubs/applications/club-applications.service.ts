import { ForbiddenException, Injectable } from '@nestjs/common';

import { ClubMemberApplicationStatus, Prisma } from '@prisma/client';

import { ClubApplicationsRepository } from './club-applications.repository';
import { CreateClubApplicationsBodyRequestDto } from './dto';
import { ClubsService } from '../clubs.service';
import { ClubMembersService } from '../members/club-members.service';
import { ClubApplicationsError } from './error';

@Injectable()
export class ClubApplicationsService {
  constructor(
    private readonly clubApplicationsRepository: ClubApplicationsRepository,
    private readonly clubsService: ClubsService,
    private readonly clubMembersService: ClubMembersService,
  ) {}

  private async validateForCreate(userId: number, clubId: number) {
    // NOTE: 클럽이 존재하는가
    await this.clubsService.findByIdWithValidation(clubId);
    // NOTE: 이미 클럽의 멤버인가
    const isExistMember = await this.clubMembersService.isExistMemberByClub(
      userId,
      clubId,
    );

    if (isExistMember) {
      throw new ForbiddenException(ClubApplicationsError.CAN_NOT_APPLY);
    }

    // NOTE: 이미 대기중인 신청 내역이 존재하는가
    const waitingApplication =
      await this.clubApplicationsRepository.findWaitingApplication(
        clubId,
        userId,
      );

    if (waitingApplication) {
      throw new ForbiddenException(
        ClubApplicationsError.ALREADY_WAITING_TO_APPLY,
      );
    }
  }

  async createApplications(
    userId: number,
    { clubId }: CreateClubApplicationsBodyRequestDto,
  ) {
    await this.validateForCreate(userId, clubId);

    const data: Prisma.ClubMemberApplicationsUncheckedCreateInput = {
      clubId,
      appliedUserId: userId,
      applicationStatus: ClubMemberApplicationStatus.WAITING,
    };

    return this.clubApplicationsRepository.create(data);
  }
}
