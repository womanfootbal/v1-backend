import { Module } from '@nestjs/common';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { ClubsRepository } from './clubs.repository';

@Module({
  controllers: [ClubsController],
  providers: [ClubsService, ClubsRepository],
  exports: [ClubsService],
})
export class ClubsModule {}
