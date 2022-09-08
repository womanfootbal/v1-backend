import { Body } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';

import {
  MatchController as Controller,
  CreateMatch,
} from './match.controller.decorator';
import { MatchService } from './match.service';
import { CreateMatchBodyRequestDto } from './dto';

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @CreateMatch()
  async createMatch(
    @Body() createMatchBodyRequestDto: CreateMatchBodyRequestDto,
    @User() { userId }: UserRequestDto,
  ) {
    await this.matchService.create(userId, createMatchBodyRequestDto);

    return null;
  }
}
