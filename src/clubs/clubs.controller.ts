import { Body, Param, Query } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';

import {
  ClubsController as Controller,
  CreateClub,
  GetClubs,
  GetClubDetails,
  UpdateClub,
} from './clubs.controller.decorator';
import { ClubsService } from './clubs.service';
import {
  CreateClubBodyRequestDto,
  GetClubDetailsParamRequestDto,
  GetClubDetailsResponseDto,
  GetClubsQueryRequestDto,
  GetClubsResponseDto,
  UpdateClubBodyRequestDto,
  UpdateClubParamRequestDto,
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
    return new GetClubDetailsResponseDto({
      club: await this.clubsService.findByIdWithValidation(
        getClubDetailsParamRequestDto,
      ),
    });
  }

  @UpdateClub()
  async updateClub(
    @User() { userId }: UserRequestDto,
    @Param() updateClubParamRequestDto: UpdateClubParamRequestDto,
    @Body() updateClubBodyRequestDto: UpdateClubBodyRequestDto,
  ) {
    await this.clubsService.update({
      userId,
      updateClubParamRequestDto,
      updateClubBodyRequestDto,
    });

    return null;
  }
}
