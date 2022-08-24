import { ForbiddenException, Injectable } from '@nestjs/common';

import { IClubsRepository } from './clubs-repository.interface';
import { CreateClubBodyRequestDto } from './dto';
import { ClubsError } from './error';

@Injectable()
export class ClubsService {
  constructor(private readonly clubsRepository: IClubsRepository) {}

  private async validateAlreadyInClubMember(userId: number) {
    const clubs = await this.clubsRepository.findByUserId(userId);
    if (clubs) {
      throw new ForbiddenException(ClubsError.ALREAY_IN_CLUB);
    }
  }

  async create(
    userId: number,
    {
      mainEvent,
      activityRegion,
      introduce,
      ageGroup,
      nickName,
    }: CreateClubBodyRequestDto,
  ) {
    await this.validateAlreadyInClubMember(userId);
    const clubs = await this.clubsRepository.create(
      { mainEvent, activityRegion, introduce, ageGroup },
      { userId, nickName },
    );

    return clubs;
  }
}
