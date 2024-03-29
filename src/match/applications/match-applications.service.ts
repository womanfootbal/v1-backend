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

  private async validateApplicationDetailsByClub(
    clubId: number,
    matchId: number,
  ): Promise<void> {
    const result = await this.matchApplicationsRepository.findByClub(
      clubId,
      matchId,
    );

    if (result) {
      throw new BadRequestException(
        MatchApplicationsError.ALREADY_MATCH_APPLICATION,
      );
    }
  }

  private async validateForCreate(
    matchId: number,
    clubId: number,
  ): Promise<void> {
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

    // Check if the match has already been application
    await this.validateApplicationDetailsByClub(clubId, matchId);

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
    // Check if the member of the club
    const isMemberOfClub = await this.clubMembersService.isExistMember(
      userId,
      clubId,
    );
    if (!isMemberOfClub) {
      throw new BadRequestException(MatchApplicationsError.NOT_CLUB_MEMBER);
    }

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
