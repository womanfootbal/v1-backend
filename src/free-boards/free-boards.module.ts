import { Module } from '@nestjs/common';
import { FreeBoardsController } from './free-boards.controller';
import { FreeBoardsService } from './free-boards.service';
import { FreeBoardsRepository } from './free-boards.repository';
import { FreeBoardsLikesController } from './free-boards-likes/free-boards-likes.controller';

@Module({
  controllers: [FreeBoardsController, FreeBoardsLikesController],
  providers: [FreeBoardsService, FreeBoardsRepository],
  exports: [FreeBoardsService],
})
export class FreeBoardsModule {}
