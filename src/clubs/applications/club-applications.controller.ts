import { Body } from '@nestjs/common';
import {
  ClubApplicationsController as Controller,
  CreateClubApplications,
} from './club-applications.controller.decorator';
import { ClubApplicationsService } from './club-applications.service';
import { CreateClubApplicationsBodyRequestDto } from './dto';

@Controller()
export class ClubApplicationsController {
  constructor(
    private readonly clubApplicationsService: ClubApplicationsService,
  ) {}

  @CreateClubApplications()
  async createClubApplications(
    @Body()
    createClubApplicationsBodyRequestDto: CreateClubApplicationsBodyRequestDto,
  ) {
    return null;
  }
}
