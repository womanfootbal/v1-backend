import { ClubMembers, Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ClubMembersEntity implements ClubMembers {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  clubId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty({ enum: [Role] })
  role: Role;

  @ApiProperty()
  nickName: string;
}
