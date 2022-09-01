import { Body, Param } from '@nestjs/common';

import { User } from '@app/utils/users.decorator';
import { UserRequestDto } from '@shared/dto';
import { FreeBoardsService } from './free-boards.service';

import {
  FreeBoardsController as Controller,
  UpdateFreeBoards,
  DeleteFreeBoards,
  GetFreeBoards,
  GetFreeBoard,
  CreateFreeBoard,
} from './free-boards.controller.decorator';

import { CreateFreeBoardsDto } from './dto/create-free-boards.dto';
import {
  UpdateFreeBoardsDto,
  UpdateFreeBoardsParamDto,
} from './dto/update-free-boards.dto';
import { DeleteFreeBoardsParamDto } from './dto/delete-free-boards.dto';

@Controller()
export class FreeBoardsController {
  constructor(private readonly freeBoardsService: FreeBoardsService) {}

  @CreateFreeBoard()
  async create(
    @User() { userId }: UserRequestDto,
    @Body() createFreeBoardsDto: CreateFreeBoardsDto,
  ) {
    await this.freeBoardsService.create(userId, createFreeBoardsDto);

    return null;
  }

  @GetFreeBoards()
  findMany() {
    return this.freeBoardsService.findMany();
  }

  @GetFreeBoard()
  findById(@Param('freeBoardId') id: string) {
    return this.freeBoardsService.findById(+id);
  }

  @UpdateFreeBoards()
  update(
    @Param() updateFreeBoardsParamDto: UpdateFreeBoardsParamDto,
    @User() { userId }: UserRequestDto,
    @Body() body: UpdateFreeBoardsDto,
  ) {
    return this.freeBoardsService.update(
      updateFreeBoardsParamDto.freeBoardId,
      userId,
      body,
    );
  }

  @DeleteFreeBoards()
  delete(
    @Param() deleteFreeBoardsParamDto: DeleteFreeBoardsParamDto,
    @User() { userId }: UserRequestDto,
  ) {
    return this.freeBoardsService.delete(
      deleteFreeBoardsParamDto.freeBoardId,
      userId,
    );
  }
}
