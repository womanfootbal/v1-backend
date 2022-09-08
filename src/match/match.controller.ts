import { Body } from '@nestjs/common';

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
  createMatch(@Body() createMatchBodyRequestDto: CreateMatchBodyRequestDto) {
    return null;
  }
}
