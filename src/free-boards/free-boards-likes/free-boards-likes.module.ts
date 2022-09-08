import { Module } from '@nestjs/common';
import { FreeBoardsLikesRepository } from './free-boards-likes.repository';
import { FreeBoardsModule } from '../free-boards.module';
import { FreeBoardsLikesController } from './free-boards-likes.controller';
import { FreeBoardsLikesService } from './free-boards-likes.service';

@Module({
  imports: [FreeBoardsModule],
  controllers: [FreeBoardsLikesController],
  providers: [FreeBoardsLikesService, FreeBoardsLikesRepository],
})
export class FreeBoardsLikesModule {}
