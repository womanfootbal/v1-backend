import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as _ from 'lodash';

import {
  CreateClubBodyRequestDto,
  GetClubDetailsParamRequestDto,
  GetClubsQueryRequestDto,
  GetClubsResponseDto,
} from './dto';
import { ClubsError } from './error';
import { ClubsRepository } from './clubs.repository';

@Injectable()
export class ClubsService {
  constructor(private readonly clubsRepository: ClubsRepository) {}

  private async validateAlreadyInClubMember(userId: number) {
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
    await this.validateAlreadyInClubMember(userId);

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
}
