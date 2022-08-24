import { Injectable } from '@nestjs/common';
import { CreateFreeBoardsCommentsDto } from './dto/create-free-boards-comments.dto';
import { FreeBoardsCommentsRepository } from './free-boards-comments.repository';

@Injectable()
export class FreeBoardsCommentsService {
  constructor(
    private readonly freeBoardsCommentsRepository: FreeBoardsCommentsRepository,
  ) {}

  create(createFreeBoardsCommentsDto: CreateFreeBoardsCommentsDto) {
    return this.freeBoardsCommentsRepository.create(
      createFreeBoardsCommentsDto,
    );
  }
}
