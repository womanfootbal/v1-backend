import { ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { CreateFreeBoardsCommentsDto } from './dto/create-free-boards-comments.dto';
import { FreeBoardsCommentsRepository } from './free-boards-comments.repository';
import { FreeBoardsService } from '../free-boards.service';

@Injectable()
export class FreeBoardsCommentsService {
  constructor(
    private readonly freeBoardsCommentsRepository: FreeBoardsCommentsRepository,
    private readonly freeBoardsService: FreeBoardsService,
  ) {}

  create(createFreeBoardsCommentsDto: CreateFreeBoardsCommentsDto) {
    const isFreeBoardId = this.freeBoardsService.findById(
      createFreeBoardsCommentsDto.freeBoardId,
    );

    if (isEmpty(isFreeBoardId)) {
      throw new ForbiddenException('존재하지 않는 게시글 입니다.');
    }

    return this.freeBoardsCommentsRepository.create(
      createFreeBoardsCommentsDto,
    );
  }

  findByFreeBoardId(freeBoardId: number) {
    return this.freeBoardsCommentsRepository.findByFreeBoardId(freeBoardId);
  }
}
