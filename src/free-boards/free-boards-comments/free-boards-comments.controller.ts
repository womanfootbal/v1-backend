import { Body, Post } from '@nestjs/common';
import { FreeBoardsCommentsService } from './free-boards-comments.service';
import { FreeBoardsCommentsController as Controller } from './free-boards-comment.controller.decorator';

import { CreateFreeBoardsCommentsDto } from './dto/create-free-boards-comments.dto';

@Controller()
export class FreeBoardsCommentsController {
  constructor(
    private readonly freeBoarsCommentsService: FreeBoardsCommentsService,
  ) {}

  @Post('/')
  create(@Body() createFreeBoardsCommentsDto: CreateFreeBoardsCommentsDto) {
    return this.freeBoarsCommentsService.create(createFreeBoardsCommentsDto);
  }
}
