import { Injectable } from '@nestjs/common';
import { ClubMembers, Prisma, Role } from '@prisma/client';

import { PrismaService } from '@app/prisma';

@Injectable()
export class ClubMembersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findByClub(clubId: number): Promise<ClubMembers[]> {
    return this.prismaService.clubMembers.findMany({
      where: {
        clubId,
      },
      orderBy: {
        role: 'asc',
      },
    });
  }

  findMemberOfClub(userId: number, clubId: number) {
    return this.prismaService.clubMembers.findFirst({
      where: {
        userId,
        clubId,
        status: true,
      },
    });
  }

  create(data: Prisma.ClubMembersUncheckedCreateInput) {
    return this.prismaService.clubMembers.create({
      data,
    });
  }

  findById(id: number): Promise<ClubMembers | null> {
    return this.prismaService.clubMembers.findUnique({
      where: {
        id,
      },
    });
  }

  updateCaptainStatusToMember(captainMemberId: number, memberId: number) {
    return this.prismaService.$transaction([
      this.prismaService.clubMembers.update({
        where: {
          id: captainMemberId,
        },
        data: {
          role: Role.MEMBER,
        },
      }),
      this.prismaService.clubMembers.update({
        where: {
          id: memberId,
        },
        data: {
          role: Role.CAPTAIN,
        },
      }),
    ]);
  }

  deleteMember(id: number) {
    return this.prismaService.clubMembers.update({
      where: {
        id,
      },
      data: {
        status: false,
      },
    });
  }
}
