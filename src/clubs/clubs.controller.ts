import { Body } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';

import {
  ClubsController as Controller,
  CreateClub,
} from './clubs.controller.decorator';
import { ClubsService } from './clubs.service';
import { CreateClubBodyRequestDto } from './dto';

@Controller()
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @CreateClub()
  async createClub(
    @User() { userId }: UserRequestDto,
    @Body() createClubBodyRequestDto: CreateClubBodyRequestDto,
  ) {
    const result = await this.clubsService.create(
      userId,
      createClubBodyRequestDto,
    );

    return result;
  }
}
