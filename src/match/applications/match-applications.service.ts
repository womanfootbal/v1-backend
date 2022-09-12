import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from '@app/prisma';
import { ClubMembersService } from '@src/clubs/members/club-members.service';
import { MatchService } from '@src/match/match.service';

import { MatchApplicationsRepository } from './match-applications.repository';
import { CreateMatchApplicationsRequestDto } from './dto';
import { MatchApplicationsError } from './error';

@Injectable()
export class MatchApplicationsService {
  constructor(
    private readonly matchApplicationsRepository: MatchApplicationsRepository,
    private readonly clubMembersService: ClubMembersService,
    private readonly matchService: MatchService,
  ) {}

  private async validateForCreate(matchId: number, clubId: number) {
    const {
      clubId: matchedClubId,
      year,
      month,
      day,
      startTime,
      endTime,
    } = await this.matchService.findByIdAndValidate(matchId);

    // Check if applying for My Club Matching
    if (matchedClubId === clubId) {
      throw new BadRequestException(
        MatchApplicationsError.CAN_NOT_APPLY_FOR_MY_CLUB_MATCH,
      );
    }

    // Check if match that has already been applied for
    await this.matchService.validateIsMatchedByClub({
      clubId,
      year,
      month,
      day,
      startTime,
      endTime,
    });
  }

  async create(
    userId: number,
    { matchId, clubId }: CreateMatchApplicationsRequestDto,
  ) {
    // Check if the captain of the club
    await this.clubMembersService.findAndValidateIsCaptain(userId, clubId);
    await this.validateForCreate(matchId, clubId);

    try {
      return await this.matchApplicationsRepository.create({
        matchId,
        clubId,
        userId,
      });
    } catch (error) {
      if (PrismaService.isPrismaError(error)) {
        throw new ConflictException(error);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
