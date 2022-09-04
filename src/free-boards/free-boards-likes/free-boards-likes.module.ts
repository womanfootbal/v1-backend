import { Module } from '@nestjs/common';
import { FreeBoardsCommentsRepository } from '../free-boards-comments/free-boards-comments.repository';
import { FreeBoardsModule } from '../free-boards.module';
import { FreeBoardsLikesController } from './free-boards-likes.controller';
import { FreeBoardsLikesService } from './free-boards-likes.service';

@Module({
  imports: [FreeBoardsModule],
  controllers: [FreeBoardsLikesController],
  providers: [FreeBoardsLikesService, FreeBoardsCommentsRepository],
  exports: [FreeBoardsLikesService],
})
export class FreeBoardsLikesModule {}
