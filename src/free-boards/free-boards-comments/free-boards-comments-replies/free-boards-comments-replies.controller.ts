import { User } from '@app/utils/users.decorator';
import { Body } from '@nestjs/common';
import { UserRequestDto } from '@shared/dto';
import { CreateFreeBoardsCommentsRepliesDto } from './dto/create-free-boards-comments-replies.dto';
import {
  CreateFreeBoardCommentReplie,
  FreeBoardsCommentsRepliesController as Controller,
} from './free-boards-comments-replies.controller.decorator';
import { FreeBoardsCommentsRepliesService } from './free-boards-comments-replies.service';

@Controller()
export class FreeBoardsCommentsRepliesController {
  constructor(
    private readonly freeBoardsCommentsRepliesService: FreeBoardsCommentsRepliesService,
  ) {}

  @CreateFreeBoardCommentReplie()
  async create(
    @User() { userId }: UserRequestDto,
    @Body()
    createFreeBoardsCommentsRepliesDto: CreateFreeBoardsCommentsRepliesDto,
  ) {
    await this.freeBoardsCommentsRepliesService.create(
      userId,
      createFreeBoardsCommentsRepliesDto,
    );

    return null;
  }
}
