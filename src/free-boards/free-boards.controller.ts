import { Body, Get, Param, Post } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';
import { FreeBoardsService } from './free-boards.service';

import {
  FreeBoardsController as Controller,
  UpdateFreeBoards,
  DeleteFreeBoards,
} from './free-boards.controller.decorator';

import { CreateFreeBoardsDto } from './dto/create-free-boards.dto';
import { UpdateFreeBoardsDto } from './dto/update-free-boards.dto';

@Controller()
export class FreeBoardsController {
  constructor(private readonly freeBoardsService: FreeBoardsService) {}

  @Post('/')
  create(@Body() createFreeBoardsDto: CreateFreeBoardsDto) {
    return this.freeBoardsService.create(createFreeBoardsDto);
  }

  @Get('/')
  findMany() {
    return this.freeBoardsService.findMany();
  }

  @Get('/:id')
  findUnique(@Param('id') id: string) {
    return this.freeBoardsService.findUnique(+id);
  }

  @UpdateFreeBoards()
  update(
    @Param('id') id: string,
    @User() { userId }: UserRequestDto,
    @Body() body: UpdateFreeBoardsDto,
  ) {
    return this.freeBoardsService.update(+id, userId, body);
  }

  @DeleteFreeBoards()
  delete(@Param('id') id: string, @User() { userId }: UserRequestDto) {
    return this.freeBoardsService.delete(+id, userId);
  }
}
