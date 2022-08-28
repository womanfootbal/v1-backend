import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClubMembers, Clubs, Role } from '@prisma/client';
import * as _ from 'lodash';

import {
  CreateClubBodyRequestDto,
  GetClubDetailsParamRequestDto,
  GetClubsQueryRequestDto,
  GetClubsResponseDto,
} from './dto';
import { ClubsError } from './error';
import { ClubsRepository } from './clubs.repository';
import { IUpdateClubOptions } from './type';

@Injectable()
export class ClubsService {
  constructor(private readonly clubsRepository: ClubsRepository) {}

  private async validateAlreadyHasClub(userId: number) {
    const clubs = await this.clubsRepository.findByUserId(userId);
    if (clubs) {
      throw new ForbiddenException(ClubsError.ALREAY_IN_CLUB);
    }
  }

  async findByIdWithValidation({ clubId }: GetClubDetailsParamRequestDto) {
    const result = await this.clubsRepository.findById(clubId);
    if (!result || !result.status) {
      throw new NotFoundException(ClubsError.NOT_FOUND_CLUBS);
    }

    return result;
  }

  async create(userId: number, dto: CreateClubBodyRequestDto) {
    await this.validateAlreadyHasClub(userId);

    return this.clubsRepository.create(dto.toEntity(), {
      userId,
      nickName: dto.nickName,
    });
  }

  async findMany({
    page,
    pageSize,
    name,
    activityRegion,
  }: GetClubsQueryRequestDto): Promise<GetClubsResponseDto> {
    const [clubs, total] = await this.clubsRepository.findManyByOptions({
      page,
      pageSize,
      name,
      activityRegion,
    });

    return {
      clubs: _.isEmpty(clubs) ? null : clubs,
      total,
    };
  }

  private findCaptain(members: ClubMembers[], userId: number): boolean {
    return members.some(
      (member) => member.userId === userId && member.role === Role.CAPTAIN,
    );
  }

  private async validateIsClubMember(
    clubId: number,
    userId: number,
  ): Promise<void> {
    const clubs = await this.clubsRepository.findByIdWithMember(clubId, userId);
    if (!clubs) {
      throw new NotFoundException(
        '존재하지 않는 클럽이거나 클럽의 멤버가 아닙니다',
      );
    }
    if (!this.findCaptain(clubs.clubMembers, userId)) {
      throw new ForbiddenException('클럽의 리더만 수정이 가능합니다');
    }
  }

  async update({
    userId,
    updateClubParamRequestDto: { clubId },
    updateClubBodyRequestDto: bodyDto,
  }: IUpdateClubOptions): Promise<Clubs> {
    await this.validateIsClubMember(clubId, userId);

    return this.clubsRepository.update(clubId, bodyDto.toEntity());
  }
}
