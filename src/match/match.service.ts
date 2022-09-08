import { BadRequestException, Injectable } from '@nestjs/common';
import { MatchStatus } from '@prisma/client';

import { MatchRepository } from './match.repository';
import { CreateMatchBodyRequestDto } from './dto';
import { ClubMembersService } from '../clubs/members/club-members.service';
import { MatchError } from './error';
import { IFindMatchedOptions } from './type';

@Injectable()
export class MatchService {
  constructor(
    private readonly matchRepository: MatchRepository,
    private readonly clubMembersService: ClubMembersService,
  ) {}

  private async validateIsMatched({
    date,
    startTime,
    endTime,
  }: IFindMatchedOptions) {
    const match = await this.matchRepository.findMatched({
      date,
      startTime,
      endTime,
    });
    if (match) {
      throw new BadRequestException(MatchError.HAS_MATCH);
    }
  }

  async create(
    userId: number,
    {
      date,
      startTime,
      endTime,
      type,
      region,
      personnel,
      clubId,
    }: CreateMatchBodyRequestDto,
  ) {
    await this.clubMembersService.findAndValidateIsCaptain(userId, clubId);
    await this.validateIsMatched({ date, startTime, endTime });

    return this.matchRepository.create({
      date,
      startTime,
      endTime,
      type,
      region,
      matchStatus: MatchStatus.WAITING,
      personnel,
      userId,
      clubId,
    });
  }
}
