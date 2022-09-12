import { Body } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';
import {
  ClubNoticesController as Controller,
  CreateClubNotice,
  GetClubNotices,
} from './club-notices-controller.decorator';
import { CreateClubNoticesDto } from './dto';
import { ClubNoticesService } from './club-notices.service';

@Controller()
export class ClubNoticesController {
  constructor(private readonly clubNoticesService: ClubNoticesService) {}

  @CreateClubNotice()
  async create(
    @User() { userId }: UserRequestDto,
    @Body() createClubNoticesDto: CreateClubNoticesDto,
  ) {
    await this.clubNoticesService.create(userId, createClubNoticesDto);
  }

  @GetClubNotices()
  findMany() {
    return this.clubNoticesService.findMany();
  }
}
