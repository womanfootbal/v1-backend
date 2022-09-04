import { Param } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';

import {
  ClubMembersController as Controller,
  DelegateClubCaptain,
} from './club-members.controller.decorator';
import { DelegateCaptainParamRequestDto } from './dto';
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
}