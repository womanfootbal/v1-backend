import { Body, Get, Param, Post } from '@nestjs/common';
import { FreeboardsService } from './free-boards.service';
import { FreeBoardsController as Controller } from './free-boards.controller.decorator';
import { CreateFreeboardsDto } from './dto/create-free-boards.dto';

@Controller()
export class FreeboardsController {
  constructor(private readonly freeboardsService: FreeboardsService) {}

  @Post('/')
  create(@Body() createFreeboardsDto: CreateFreeboardsDto) {
    return this.freeboardsService.create(createFreeboardsDto);
  }

  @Get('/')
  findMany() {
    return this.freeboardsService.findMany();
  }

  @Get('/:id')
  findUnique(@Param('id') id: string) {
    return this.freeboardsService.findUnique(+id);
  }
}
