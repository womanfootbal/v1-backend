import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClubMembers, Clubs, Role } from '@prisma/client';
import * as _ from 'lodash';

import {
  CreateClubBodyRequestDto,
  DeleteClubParamRequestDto,
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
      throw new ForbiddenException(ClubsError.ALREADY_IN_CLUB);
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

  private async validateUpdateClub(
    clubId: number,
    userId: number,
  ): Promise<void> {
    const [club, clubMember] =
      await this.clubsRepository.findByIdAndUserIdWithMember(clubId, userId);
    if (!club) {
      throw new NotFoundException(ClubsError.NOT_FOUND_CLUBS);
    }
    if (!clubMember) {
      throw new NotFoundException(ClubsError.NOT_FOUND_CLUB_MEMBER);
    }
    if (clubMember.role !== Role.CAPTAIN) {
      throw new ForbiddenException(ClubsError.ONLY_CLUB_OF_CAPTAIN_CAN_EDIT);
    }
  }

  async update({
    userId,
    updateClubParamRequestDto: { clubId },
    updateClubBodyRequestDto: bodyDto,
  }: IUpdateClubOptions): Promise<Clubs> {
    await this.validateUpdateClub(clubId, userId);

    return this.clubsRepository.update(clubId, bodyDto.toEntity());
  }

  private async validateDeleteClub(clubId: number, userId: number) {
    const [clubs, clubMember, count] =
      await this.clubsRepository.findByIdAndUserIdWithMember(clubId, userId);
    if (!clubs) {
      throw new NotFoundException(
        ClubsError.NOT_FOUND_CLUB_OR_NOT_FOUND_CLUB_MEMBER,
      );
    }
    if (count > 1) {
      throw new BadRequestException(
        ClubsError.CAN_NOT_BE_DELETED_IF_MEMBER_EXIST,
      );
    }
    if (!clubMember) {
      throw new ForbiddenException(ClubsError.ONLY_CLUB_OF_CAPTAIN_CAN_DELETE);
    }
    if (clubMember.role !== Role.CAPTAIN) {
      throw new ForbiddenException(ClubsError.ONLY_CLUB_OF_CAPTAIN_CAN_DELETE);
    }
  }

  async delete(userId: number, { clubId }: DeleteClubParamRequestDto) {
    await this.validateDeleteClub(clubId, userId);

    return this.clubsRepository.delete(clubId);
  }
}
