import { Body } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';

import {
  MatchApplicationsController as Controller,
  CreateMatchApplications,
} from './match-applications.controller.decorator';
import { MatchApplicationsService } from './match-applications.service';
import { CreateMatchApplicationsRequestDto } from './dto';

@Controller()
export class MatchApplicationsController {
  constructor(
    private readonly matchApplicationsService: MatchApplicationsService,
  ) {}

  @CreateMatchApplications()
  async createMatchApplications(
    @Body()
    createMatchApplicationsRequestDto: CreateMatchApplicationsRequestDto,
    @User() { userId }: UserRequestDto,
  ) {
    await this.matchApplicationsService.create(
      userId,
      createMatchApplicationsRequestDto,
    );

    return null;
  }
}
