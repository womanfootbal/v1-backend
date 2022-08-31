import { Body, Param } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';

import {
  ClubApplicationsController as Controller,
  CreateClubApplications,
  ApproveClubApplications,
} from './club-applications.controller.decorator';
import { ClubApplicationsService } from './club-applications.service';
import {
  CreateClubApplicationsBodyRequestDto,
  UpdateClubApplicationsStatusToCompletedParamRequestDto,
} from './dto';

@Controller()
export class ClubApplicationsController {
  constructor(
    private readonly clubApplicationsService: ClubApplicationsService,
  ) {}

  @CreateClubApplications()
  async createClubApplications(
    @User() { userId }: UserRequestDto,
    @Body()
    createClubApplicationsBodyRequestDto: CreateClubApplicationsBodyRequestDto,
  ) {
    await this.clubApplicationsService.createApplications(
      userId,
      createClubApplicationsBodyRequestDto,
    );

    return null;
  }

  @ApproveClubApplications()
  async approveClubApplications(
    @Param()
    updateClubApplicationsStatusToCompletedParamRequestDto: UpdateClubApplicationsStatusToCompletedParamRequestDto,
    @User() { userId }: UserRequestDto,
  ) {
    return null;
  }
}
