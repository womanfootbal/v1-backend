import { Body, Get } from '@nestjs/common';
import { FreeBoardsLikesService } from './free-boards-likes.service';
import {
  FreeBoardsLikesController as Controller,
  CreateFreeBoardsLikes,
} from './free-boards-likes.controller.decorator';
import { CreateFreeBoardsLikesDto } from './dto';

@Controller()
export class FreeBoardsLikesController {
  constructor(
    private readonly freeBoardsLikesService: FreeBoardsLikesService,
  ) {}

  @CreateFreeBoardsLikes()
  create(@Body() createFreeBoardsLikesDto: CreateFreeBoardsLikesDto) {
    return this.freeBoardsLikesService.create(createFreeBoardsLikesDto);
  }

  @Get('/')
  findMany() {
    return this.freeBoardsLikesService.findMany();
  }
}
