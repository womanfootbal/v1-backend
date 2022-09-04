import { Body, Get, Param, Post } from '@nestjs/common';
import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto/user-request.dto';
import { FreeBoardsCommentsService } from './free-boards-comments.service';
import {
  DeleteFreeBoardsComments,
  FreeBoardsCommentsController as Controller,
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
    private readonly freeBoardsCommentsService: FreeBoardsCommentsService,
  ) {}

  @Post('/')
  create(@Body() createFreeBoardsCommentsDto: CreateFreeBoardsCommentsDto) {
    return this.freeBoardsCommentsService.create(createFreeBoardsCommentsDto);
  }

  @Get('/')
  findMany() {
    return this.freeBoardsCommentsService.findMany();
  }

  @Get('/:id')
  findByFreeBoardId(@Param('id') freeBoardId: string) {
    return this.freeBoardsCommentsService.findByFreeBoardId(+freeBoardId);
  }

  @Get('/:id')
  findByFreeBoardCommentId(@Param('id') freeBoardCommentId: string) {
    return this.freeBoardsCommentsService.findByFreeBoardCommentId(
      +freeBoardCommentId,
    );
  }

  @UpdateFreeBoardsComments()
  update(
    @Param() updateFreeBoardsCommentsParamDto: UpdateFreeBoardsCommentsParamDto,
    @User() { userId }: UserRequestDto,
    @Body() body: UpdateFreeBoardsCommentsDto,
  ) {
    return this.freeBoardsCommentsService.update(
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
    return this.freeBoardsCommentsService.delete(freeBoardId, userId);
  }
}
