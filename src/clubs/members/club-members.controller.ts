import { Param } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';

import {
  ClubMembersController as Controller,
  DelegateClubCaptain,
  ResignClubMember,
  FindClubMembers,
} from './club-members.controller.decorator';
import {
  DelegateCaptainParamRequestDto,
  ResignClubMemberParamRequestDto,
  FindClubMembersParamRequestDto,
  FindClubMembersResponseDto,
} from './dto';
import { ClubMembersService } from './club-members.service';

@Controller()
export class ClubMembersController {
  constructor(private readonly clubMembersService: ClubMembersService) {}

  @DelegateClubCaptain()
  async delegateCaptain(
    @User() { userId }: UserRequestDto,
    @Param() delegateCaptainParamRequestDto: DelegateCaptainParamRequestDto,
  ) {
    await this.clubMembersService.delegateCaptain(
      userId,
      delegateCaptainParamRequestDto,
    );

    return null;
  }

  @ResignClubMember()
  async resignClubMember(
    @User() { userId }: UserRequestDto,
    @Param() resignClubMemberParamRequestDto: ResignClubMemberParamRequestDto,
  ) {
    await this.clubMembersService.resignClubMember(
      userId,
      resignClubMemberParamRequestDto,
    );

    return null;
  }

  @FindClubMembers()
  async findClubMembers(
    @User() { userId }: UserRequestDto,
    @Param() findClubMembersParamRequestDto: FindClubMembersParamRequestDto,
  ) {
    return new FindClubMembersResponseDto({
      clubMembers: await this.clubMembersService.findByClub(
        userId,
        findClubMembersParamRequestDto,
      ),
    });
  }
}
