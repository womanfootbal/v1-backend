import { Body, Param, Query } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';

import {
  ClubsController as Controller,
  CreateClub,
  GetClubs,
  GetClubDetails,
} from './clubs.controller.decorator';
import { ClubsService } from './clubs.service';
import {
  CreateClubBodyRequestDto,
  GetClubDetailsParamRequestDto,
  GetClubsQueryRequestDto,
  GetClubsResponseDto,
} from './dto';

@Controller()
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @CreateClub()
  async createClub(
    @User() { userId }: UserRequestDto,
    @Body() createClubBodyRequestDto: CreateClubBodyRequestDto,
  ) {
    await this.clubsService.create(userId, createClubBodyRequestDto);

    return null;
  }

  @GetClubs()
  async getClubs(@Query() getClubsQueryRequestDto: GetClubsQueryRequestDto) {
    const result = await this.clubsService.findMany(getClubsQueryRequestDto);
    return new GetClubsResponseDto(result);
  }

  @GetClubDetails()
  async getClubDetails(
    @Param() getClubDetailsParamRequestDto: GetClubDetailsParamRequestDto,
  ) {
    return null;
  }
}
