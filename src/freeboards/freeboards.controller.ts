import { Body, Post } from '@nestjs/common';
import { FreeboardsService } from './freeboards.service';
import { UserController as Controller } from './freeboards.controller.decorator';
import { CreateFreeboardsDto } from './dto/create-freeboards.dto';

@Controller()
export class FreeboardsController {
  constructor(private readonly freeboardsService: FreeboardsService) {}

  @Post('/')
  create(@Body() createFreeboardsDto: CreateFreeboardsDto) {
    return this.freeboardsService.create(createFreeboardsDto);
  }
}
