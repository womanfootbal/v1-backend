import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClubMemberApplicationStatus, Prisma } from '@prisma/client';

import { ClubApplicationsRepository } from './club-applications.repository';
import {
  CreateClubApplicationsBodyRequestDto,
  UpdateClubApplicationsStatusToCanceledRequestDto,
  UpdateClubApplicationsStatusToCompletedParamRequestDto,
} from './dto';
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
    { clubId, nickName }: CreateClubApplicationsBodyRequestDto,
  ) {
    await this.validateForCreate(userId, clubId);

    const data: Prisma.ClubMemberApplicationsUncheckedCreateInput = {
      clubId,
      appliedUserId: userId,
      nickName,
      applicationStatus: ClubMemberApplicationStatus.WAITING,
    };

    return this.clubApplicationsRepository.create(data);
  }

  private async findByIdAndValidateIsWaitingApplication(id: number) {
    const result = await this.clubApplicationsRepository.findById(id);
    if (!result || result.status !== true) {
      throw new NotFoundException(ClubApplicationsError.NOT_FOUND_APPLICATION);
    }

    if (result.applicationStatus !== ClubMemberApplicationStatus.WAITING) {
      throw new BadRequestException(ClubApplicationsError.NOT_WAITING_STATUS);
    }

    return result;
  }

  async updateApplicationStatusToCompleted(
    { applicationId }: UpdateClubApplicationsStatusToCompletedParamRequestDto,
    userId: number,
  ) {
    const { clubId, appliedUserId, nickName } =
      await this.findByIdAndValidateIsWaitingApplication(applicationId);

    await this.clubMembersService.validateIsCaptain(userId, clubId);

    return this.clubApplicationsRepository.updateStatusToCompletedAndCreateMember(
      applicationId,
      { clubId, userId: appliedUserId, nickName },
    );
  }

  async updateApplicationStatusToCanceled(
    { applicationId }: UpdateClubApplicationsStatusToCanceledRequestDto,
    userId: number,
  ) {
    const { clubId } = await this.findByIdAndValidateIsWaitingApplication(
      applicationId,
    );

    await this.clubMembersService.validateIsCaptain(userId, clubId);

    return this.clubApplicationsRepository.updateStatusToCanceled(
      applicationId,
    );
  }
}
