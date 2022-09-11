import { BadRequestException, Injectable } from '@nestjs/common';
import { Matches, MatchStatus } from '@prisma/client';
import * as _ from 'lodash';

import { MatchRepository } from './match.repository';
import { CreateMatchBodyRequestDto, GetMatchesQueryRequestDto } from './dto';
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
    year,
    month,
    day,
    startTime,
    endTime,
  }: IFindMatchedOptions) {
    const match = await this.matchRepository.findMatched({
      year,
      month,
      day,
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
      year,
      month,
      day,
      startTime,
      endTime,
      type,
      region,
      personnel,
      clubId,
    }: CreateMatchBodyRequestDto,
  ) {
    await this.clubMembersService.findAndValidateIsCaptain(userId, clubId);
    await this.validateIsMatched({ year, month, day, startTime, endTime });

    return this.matchRepository.create({
      year,
      month,
      day,
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

  async getByDate({
    year,
    month,
    day,
  }: GetMatchesQueryRequestDto): Promise<Matches[] | null> {
    const result = await this.matchRepository.findByDate({ year, month, day });

    return _.isEmpty(result) ? null : result;
  }
}
