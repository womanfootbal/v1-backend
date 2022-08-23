import { Module } from '@nestjs/common';
import { FreeboardsController } from './freeboards.controller';
import { FreeboardsService } from './freeboards.service';
import { FreeboardsRepository } from './freeboards.repository';

@Module({
  controllers: [FreeboardsController],
  providers: [FreeboardsService, FreeboardsRepository],
})
export class FreeboardsModule {}
