import { Module } from '@nestjs/common';
import { FreeBoardsController } from './free-boards.controller';
import { FreeBoardsService } from './free-boards.service';
import { FreeBoardsRepository } from './free-boards.repository';

@Module({
  controllers: [FreeBoardsController],
  providers: [FreeBoardsService, FreeBoardsRepository],
  exports: [FreeBoardsService],
})
export class FreeBoardsModule {}
