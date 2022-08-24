import { Module } from '@nestjs/common';
import { FreeBoardsCommentsController } from './free-boards-comments.controller';
import { FreeBoardsCommentsService } from './free-boards-comments.service';
import { FreeBoardsCommentsRepository } from './free-boards-comments.repository';

@Module({
  controllers: [FreeBoardsCommentsController],
  providers: [FreeBoardsCommentsService, FreeBoardsCommentsRepository],
})
export class FreeBoardsCommentsModule {}
