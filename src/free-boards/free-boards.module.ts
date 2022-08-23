import { Module } from '@nestjs/common';
import { FreeboardsController } from './free-boards.controller';
import { FreeboardsService } from './free-boards.service';
import { FreeboardsRepository } from './free-boards.repository';

@Module({
  controllers: [FreeboardsController],
  providers: [FreeboardsService, FreeboardsRepository],
})
export class FreeboardsModule {}
