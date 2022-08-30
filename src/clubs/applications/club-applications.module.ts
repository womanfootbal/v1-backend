import { Module } from '@nestjs/common';

import { ClubApplicationsController } from './club-applications.controller';
import { ClubApplicationsService } from './club-applications.service';

@Module({
  controllers: [ClubApplicationsController],
  providers: [ClubApplicationsService],
})
export class ClubApplicationsModule {}
