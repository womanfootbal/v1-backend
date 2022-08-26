import { ClubsEntity } from '@app/prisma/entities';

export class GetClubDetailsResponseDto {
  club: ClubsEntity;

  constructor(partial: Partial<GetClubDetailsResponseDto>) {
    Object.assign(this, partial);
  }
}
