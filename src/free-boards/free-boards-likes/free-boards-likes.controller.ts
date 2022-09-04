import { Get } from '@nestjs/common';
import { FreeBoardsLikesService } from './free-boards-likes.service';
import { FreeBoardsLikesController as Controller } from './free-boards-likes.controller.decorator';

@Controller()
export class FreeBoardsLikesController {
  constructor(
    private readonly freeBoardsLikesService: FreeBoardsLikesService,
  ) {}

  @Get('/')
  findMany() {
    return this.freeBoardsLikesService.findMany();
  }
}
