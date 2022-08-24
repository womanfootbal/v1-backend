import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FreeBoardsService } from './free-boards.service';
import { FreeBoardsController as Controller } from './free-boards.controller.decorator';
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

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateFreeBoardsDto: UpdateFreeBoardsDto,
  ) {
    return this.freeBoardsService.update(+id, updateFreeBoardsDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.freeBoardsService.delete(+id);
  }
}
