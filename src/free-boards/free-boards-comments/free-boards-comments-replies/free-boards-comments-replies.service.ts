import { ForbiddenException, Injectable } from '@nestjs/common';
import { FreeBoardsCommentsService } from '../free-boards-comments.service';
import { CreateFreeBoardsCommentsRepliesDto } from './dto/create-free-boards-comments-replies.dto';
import { FreeBoardsCommentsRepliesRepository } from './free-boards-comments-replies.repository';

@Injectable()
export class FreeBoardsCommentsRepliesService {
  constructor(
    private readonly freeBoardsCommentsRepliesRepository: FreeBoardsCommentsRepliesRepository,
    private readonly freeBoardsCommentsService: FreeBoardsCommentsService,
  ) {}

  async create(
    userId: number,
    createFreeBoardsCommentsRepliesDto: CreateFreeBoardsCommentsRepliesDto,
  ) {
    const freeBoardCommentId =
      this.freeBoardsCommentsService.findByFreeBoardCommentId(
        createFreeBoardsCommentsRepliesDto.freeBoardCommentId,
      );

    if (!freeBoardCommentId) {
      throw new ForbiddenException(
        '존재하지 않는 댓글에 대댓글을 달 수 없습니다.',
      );
    }

    const createData = {
      freeBoardCommentId: createFreeBoardsCommentsRepliesDto.freeBoardCommentId,
      contents: createFreeBoardsCommentsRepliesDto.contents,
      userId,
    };

    return this.freeBoardsCommentsRepliesRepository.create(createData);
  }
}
