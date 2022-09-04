import { Injectable } from '@nestjs/common';
import { FreeBoardsLikesRepository } from './free-boards-likes.repository';

@Injectable()
export class FreeBoardsLikesService {
  constructor(
    private readonly freeBoardsLikesRepository: FreeBoardsLikesRepository,
  ) {}

  findMany() {
    return this.freeBoardsLikesRepository.findMany();
  }
}
