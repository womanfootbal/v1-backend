import { Body, Controller, Post } from '@nestjs/common';
import { CreateFreeboardDto } from './dto/create-freeboard.dto';

@Controller('freeboards')
export class FreeboardsController {
  @Post()
  create(@Body() freeboardData: CreateFreeboardDto) {
    return this.freeboardsService.create(freeboardData);
  }
}
