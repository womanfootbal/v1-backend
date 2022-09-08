import { Injectable } from '@nestjs/common';
import { CreateFreeBoardsLikesDto } from './dto';
import { FreeBoardsLikesRepository } from './free-boards-likes.repository';

@Injectable()
export class FreeBoardsLikesService {
  constructor(
    private readonly freeBoardsLikesRepository: FreeBoardsLikesRepository,
  ) {}

  create(createFreeBoardsLikesDto: CreateFreeBoardsLikesDto) {
    return this.freeBoardsLikesRepository.create(createFreeBoardsLikesDto);
  }

  findMany() {
    return this.freeBoardsLikesRepository.findMany();
  }
}
