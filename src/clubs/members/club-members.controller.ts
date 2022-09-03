import { Param } from '@nestjs/common';
import { ClubMembersController as Controller } from './club-members.controller.decorator';
import { DelegateCaptainParamRequestDto } from './dto';

@Controller()
export class ClubMembersController {
  async delegateCaptain(
    @Param() delegateCaptainParamRequestDto: DelegateCaptainParamRequestDto,
  ) {
    return null;
  }
}
