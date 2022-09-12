import { Module } from '@nestjs/common';
import { ClubNoticesController } from './club-notices.controller';
import { ClubNoticesRepository } from './club-notices.repository';
import { ClubNoticesService } from './club-notices.service';

@Module({
  controllers: [ClubNoticesController],
  providers: [ClubNoticesService, ClubNoticesRepository],
  exports: [ClubNoticesService],
})
export class ClubNoticesModule {}
