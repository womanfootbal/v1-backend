import { Module } from '@nestjs/common';
import { FreeBoardsCommentsModule } from '../free-boards-comments.module';
import { FreeBoardsCommentsRepliesController } from './free-boards-comments-replies.controller';
import { FreeBoardsCommentsRepliesRepository } from './free-boards-comments-replies.repository';
import { FreeBoardsCommentsRepliesService } from './free-boards-comments-replies.service';

@Module({
  imports: [FreeBoardsCommentsModule],
  controllers: [FreeBoardsCommentsRepliesController],
  providers: [
    FreeBoardsCommentsRepliesService,
    FreeBoardsCommentsRepliesRepository,
  ],
})
export class FreeBoardsCommentsRepliesModule {}
