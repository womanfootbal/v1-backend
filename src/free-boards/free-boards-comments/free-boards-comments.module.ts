import { Module } from '@nestjs/common';
import { FreeBoardsCommentsController } from './free-boards-comments.controller';
import { FreeBoardsCommentsService } from './free-boards-comments.service';
import { FreeBoardsCommentsRepository } from './free-boards-comments.repository';
import { FreeBoardsModule } from '../free-boards.module';

@Module({
  imports: [FreeBoardsModule],
  controllers: [FreeBoardsCommentsController],
  providers: [FreeBoardsCommentsService, FreeBoardsCommentsRepository],
  exports: [FreeBoardsCommentsService],
})
export class FreeBoardsCommentsModule {}
