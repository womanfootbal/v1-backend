import { ForbiddenException, Injectable } from '@nestjs/common';
import { FreeBoardsCommentsService } from '../free-boards-comments.service';
import { CreateFreeBoardsCommentsRepliesDto } from './dto/create-free-boards-comments-replies.dto';
import { UpdateFreeBoardsCommentsRepliesDto } from './dto/update-free-boards-comments-replies.dto';
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

  private findByFreeBoardCommentReplieId(freeBoardCommentReplieId: number) {
    return this.freeBoardsCommentsRepliesRepository.findByfreeBoardCommentReplieId(
      freeBoardCommentReplieId,
    );
  }

  async update(
    freeBoardCommentReplieId: number,
    userId: number,
    body: UpdateFreeBoardsCommentsRepliesDto,
  ) {
    const freeBoardCommentReplie = await this.findByFreeBoardCommentReplieId(
      freeBoardCommentReplieId,
    );

    if (userId !== freeBoardCommentReplie.userId) {
      throw new ForbiddenException('대댓글의 소유자만 수정할 수 있습니다.');
    }
    return this.freeBoardsCommentsRepliesRepository.update(
      freeBoardCommentReplieId,
      body,
    );
  }

  async delete(freeBoardCommentReplieId: number, userId: number) {
    const freeBoardCommentReplie = await this.findByFreeBoardCommentReplieId(
      freeBoardCommentReplieId,
    );

    if (userId !== freeBoardCommentReplie.userId) {
      throw new ForbiddenException('대댓글의 소유자만 삭제할 수 있습니다.');
    }

    return this.freeBoardsCommentsRepliesRepository.delete(
      freeBoardCommentReplieId,
    );
  }
}
