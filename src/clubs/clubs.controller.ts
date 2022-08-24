import { Body } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';
import { ResponseEntity } from '@shared/response';

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
    await this.clubsService.create(userId, createClubBodyRequestDto);

    return ResponseEntity.OK('클럽 생성 성공');
  }
}
