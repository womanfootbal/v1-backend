import { Body, Get, Param } from '@nestjs/common';
import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto/user-request.dto';
import { FreeBoardsCommentsService } from './free-boards-comments.service';
import {
  CreateFreeBoardComment,
  DeleteFreeBoardsComments,
  FreeBoardsCommentsController as Controller,
  GetFreeBoardComment,
  GetFreeBoardComments,
  UpdateFreeBoardsComments,
} from './free-boards-comment.controller.decorator';

import { CreateFreeBoardsCommentsDto } from './dto/create-free-boards-comments.dto';
import {
  UpdateFreeBoardsCommentsDto,
  UpdateFreeBoardsCommentsParamDto,
} from './dto/update-free-boards-comments.dto';
import { DeleteFreeBoardsParamDto } from '../dto/delete-free-boards.dto';

@Controller()
export class FreeBoardsCommentsController {
  constructor(
    private readonly freeBoarsCommentsService: FreeBoardsCommentsService,
  ) {}

  @CreateFreeBoardComment()
  async create(
    @User() { userId }: UserRequestDto,
    @Body() createFreeBoardsCommentsDto: CreateFreeBoardsCommentsDto,
  ) {
    await this.freeBoarsCommentsService.create(
      userId,
      createFreeBoardsCommentsDto,
    );

    return null;
  }

  @GetFreeBoardComments()
  findMany() {
    return this.freeBoarsCommentsService.findMany();
  }

  @Get('/:id')
  findByFreeBoardId(@Param('id') freeBoardId: string) {
    return this.freeBoarsCommentsService.findByFreeBoardId(+freeBoardId);
  }

  @GetFreeBoardComment()
  findByFreeBoardCommentId(
    @Param('freeBoardCommentId') freeBoardCommentId: string,
  ) {
    return this.freeBoarsCommentsService.findByFreeBoardCommentId(
      +freeBoardCommentId,
    );
  }

  @UpdateFreeBoardsComments()
  update(
    @Param() updateFreeBoardsCommentsParamDto: UpdateFreeBoardsCommentsParamDto,
    @User() { userId }: UserRequestDto,
    @Body() body: UpdateFreeBoardsCommentsDto,
  ) {
    return this.freeBoarsCommentsService.update(
      updateFreeBoardsCommentsParamDto.freeBoardCommentId,
      userId,
      body,
    );
  }

  @DeleteFreeBoardsComments()
  delete(
    @Param() { freeBoardId }: DeleteFreeBoardsParamDto,
    @User() { userId }: UserRequestDto,
  ) {
    return this.freeBoarsCommentsService.delete(freeBoardId, userId);
  }
}
