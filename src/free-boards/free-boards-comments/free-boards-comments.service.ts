import { ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { CreateFreeBoardsCommentsDto } from './dto/create-free-boards-comments.dto';
import { FreeBoardsCommentsRepository } from './free-boards-comments.repository';
import { FreeBoardsService } from '../free-boards.service';
import { UpdateFreeBoardsCommentsDto } from './dto/update-free-boards-comments.dto';

@Injectable()
export class FreeBoardsCommentsService {
  constructor(
    private readonly freeBoardsCommentsRepository: FreeBoardsCommentsRepository,
    private readonly freeBoardsService: FreeBoardsService,
  ) {}

  create(createFreeBoardsCommentsDto: CreateFreeBoardsCommentsDto) {
    const FreeBoardId = this.freeBoardsService.findById(
      createFreeBoardsCommentsDto.freeBoardId,
    );

    if (!FreeBoardId) {
      throw new ForbiddenException(
        '존재하지 않는 게시글에 댓글을 달 수 없습니다.',
      );
    }

    return this.freeBoardsCommentsRepository.create(
      createFreeBoardsCommentsDto,
    );
  }

  findByFreeBoardId(freeBoardId: number) {
    return this.freeBoardsCommentsRepository.findByFreeBoardId(freeBoardId);
  }

  findByFreeBoardCommentId(freeBoardCommentId: number) {
    return this.freeBoardsCommentsRepository.findByFreeBoardCommentId(
      freeBoardCommentId,
    );
  }

  async update(
    freeBoardCommentId: number,
    userId: number,
    body: UpdateFreeBoardsCommentsDto,
  ) {
    const freeBoardComment = await this.findByFreeBoardCommentId(
      freeBoardCommentId,
    );

    if (userId !== freeBoardComment.userId) {
      throw new ForbiddenException('댓글의 소유자만 수정할 수 있습니다.');
    }
    return this.freeBoardsCommentsRepository.update(freeBoardCommentId, body);
  }
}
