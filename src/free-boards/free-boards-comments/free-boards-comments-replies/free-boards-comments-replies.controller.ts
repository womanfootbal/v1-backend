import { User } from '@app/utils/users.decorator';
import { Body, Param } from '@nestjs/common';
import { UserRequestDto } from '@shared/dto';
import { CreateFreeBoardsCommentsRepliesDto } from './dto/create-free-boards-comments-replies.dto';
import { DeleteFreeBoardsCommentsRepliesParamDto } from './dto/delete-free-boards-comments-replies.dto';
import {
  UpdateFreeBoardsCommentsRepliesDto,
  UpdateFreeBoardsCommentsRepliesParamDto,
} from './dto/update-free-boards-comments-replies.dto';
import {
  CreateFreeBoardCommentReplie,
  DeleteFreeBoardsCommentsReplies,
  FreeBoardsCommentsRepliesController as Controller,
  UpdateFreeBoardsCommentsReplies,
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

  @UpdateFreeBoardsCommentsReplies()
  update(
    @Param()
    updateFreeBoardsCommentsRepliesParamDto: UpdateFreeBoardsCommentsRepliesParamDto,
    @User() { userId }: UserRequestDto,
    @Body() body: UpdateFreeBoardsCommentsRepliesDto,
  ) {
    return this.freeBoardsCommentsRepliesService.update(
      updateFreeBoardsCommentsRepliesParamDto.freeBoardCommentReplieId,
      userId,
      body,
    );
  }

  @DeleteFreeBoardsCommentsReplies()
  delete(
    @Param()
    { freeBoardCommentReplieId }: DeleteFreeBoardsCommentsRepliesParamDto,
    @User() { userId }: UserRequestDto,
  ) {
    return this.freeBoardsCommentsRepliesService.delete(
      freeBoardCommentReplieId,
      userId,
    );
  }
}
