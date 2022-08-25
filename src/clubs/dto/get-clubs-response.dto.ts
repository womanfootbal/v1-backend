import { ClubsEntity } from '@app/prisma/entities';
import { ApiProperty } from '@nestjs/swagger';

export class GetClubsResponseDto {
  @ApiProperty({ type: ClubsEntity, isArray: true, nullable: true })
  clubs: ClubsEntity[] | null;

  @ApiProperty()
  total: number;

  constructor(partial: Partial<GetClubsResponseDto>) {
    Object.assign(this, partial);
  }
}
