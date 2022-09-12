import { Injectable } from '@nestjs/common';
import { CreateClubNoticesDto } from './dto/create-club-notices.dto';
import { ClubNoticesRepository } from './club-notices.repository';

@Injectable()
export class ClubNoticesService {
  constructor(private readonly clubNoticesRepository: ClubNoticesRepository) {}

  async create(userId: number, createClubNoticesDto: CreateClubNoticesDto) {
    const createData = {
      title: createClubNoticesDto.title,
      contents: createClubNoticesDto.contents,
      clubId: createClubNoticesDto.clubId,
      userId,
    };

    return this.clubNoticesRepository.create(createData);
  }

  findMany() {
    return this.clubNoticesRepository.findMany();
  }
}
