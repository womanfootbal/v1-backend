import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findByIdAndValidate(id: number): Promise<Matches> {
    const result = await this.matchRepository.findById(id);
    if (!result) {
      throw new NotFoundException(MatchError.NOT_FOUND_MATCH);
    }

    return result;
  }

  async validateIsMatchedByClub({
    clubId,
    year,
    month,
    day,
    startTime,
    endTime,
  }: IFindMatchedOptions) {
    const match = await this.matchRepository.findMatched({
      clubId,
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

  async validateIsCompletedMatchByClub({
    clubId,
    year,
    month,
    day,
    startTime,
    endTime,
  }: IFindMatchedOptions) {
    const match = await this.matchRepository.findMatched({
      clubId,
      year,
      month,
      day,
      startTime,
      endTime,
    });
    if (match) {
      throw new BadRequestException(MatchError.HAS_MATCH);
    }
    if (match.matchStatus === MatchStatus.COMPLETED) {
      throw new BadRequestException(MatchError.ALREADY_COMPLETED_MATCH_EXIST);
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
    await this.validateIsMatchedByClub({
      clubId,
      year,
      month,
      day,
      startTime,
      endTime,
    });

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
