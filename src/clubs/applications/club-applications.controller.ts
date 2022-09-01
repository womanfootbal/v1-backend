import { Body, Param } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';

import {
  ClubApplicationsController as Controller,
  CreateClubApplications,
  UpdateClubApplicationStatusToCompleted,
  UpdateClubApplicationStatusToCancel,
} from './club-applications.controller.decorator';
import { ClubApplicationsService } from './club-applications.service';
import {
  CreateClubApplicationsBodyRequestDto,
  UpdateClubApplicationsStatusToCanceledRequestDto,
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

  @UpdateClubApplicationStatusToCompleted()
  async updateClubApplicationStatusToCompleted(
    @Param()
    updateClubApplicationsStatusToCompletedParamRequestDto: UpdateClubApplicationsStatusToCompletedParamRequestDto,
    @User() { userId }: UserRequestDto,
  ) {
    await this.clubApplicationsService.updateApplicationStatusToCompleted(
      updateClubApplicationsStatusToCompletedParamRequestDto,
      userId,
    );

    return null;
  }

  @UpdateClubApplicationStatusToCancel()
  async updateClubApplicationStatusToCancel(
    @Param()
    updateClubApplicationsStatusToCanceledRequestDto: UpdateClubApplicationsStatusToCanceledRequestDto,
    @User() { userId }: UserRequestDto,
  ) {
    await this.clubApplicationsService.updateApplicationStatusToCanceled(
      updateClubApplicationsStatusToCanceledRequestDto,
      userId,
    );

    return null;
  }
}
