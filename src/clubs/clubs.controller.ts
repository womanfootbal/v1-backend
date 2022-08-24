import { Body } from '@nestjs/common';

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
  async createClub(@Body() createClubBodyRequestDto: CreateClubBodyRequestDto) {
    return null;
  }
}
