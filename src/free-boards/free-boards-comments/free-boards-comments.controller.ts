import { Body, Get, Param, Post } from '@nestjs/common';
import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto/user-request.dto';
import { FreeBoardsCommentsService } from './free-boards-comments.service';
import {
  FreeBoardsCommentsController as Controller,
  UpdateFreeBoardsComments,
} from './free-boards-comment.controller.decorator';

import { CreateFreeBoardsCommentsDto } from './dto/create-free-boards-comments.dto';
import {
  UpdateFreeBoardsCommentsDto,
  UpdateFreeBoardsCommentsParamDto,
} from './dto/update-free-boards-comments.dto';

@Controller()
export class FreeBoardsCommentsController {
  constructor(
    private readonly freeBoarsCommentsService: FreeBoardsCommentsService,
  ) {}

  @Post('/')
  create(@Body() createFreeBoardsCommentsDto: CreateFreeBoardsCommentsDto) {
    return this.freeBoarsCommentsService.create(createFreeBoardsCommentsDto);
  }

  @Get('/:id')
  findByFreeBoardId(@Param('id') freeBoardId: string) {
    return this.freeBoarsCommentsService.findByFreeBoardId(+freeBoardId);
  }

  @Get('/:id')
  findByFreeBoardCommentId(@Param('id') freeBoardCommentId: string) {
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
}
