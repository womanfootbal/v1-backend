import { ForbiddenException, Injectable } from '@nestjs/common';

import { CreateClubBodyRequestDto } from './dto';
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

  async create(
    userId: number,
    {
      mainEvent,
      activityRegion,
      name,
      introduce,
      ageGroup,
      nickName,
    }: CreateClubBodyRequestDto,
  ) {
    await this.validateAlreadyInClubMember(userId);

    return this.clubsRepository.create(
      { mainEvent, activityRegion, name, introduce, ageGroup },
      { userId, nickName },
    );
  }
}
