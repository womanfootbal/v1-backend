import { Module } from '@nestjs/common';

import { ClubApplicationsController } from './club-applications.controller';
import { ClubApplicationsService } from './club-applications.service';
import { ClubsModule } from '../clubs.module';
import { ClubApplicationsRepository } from './club-applications.repository';
import { ClubMembersModule } from '../members/club-members.module';

@Module({
  imports: [ClubsModule, ClubMembersModule],
  controllers: [ClubApplicationsController],
  providers: [ClubApplicationsService, ClubApplicationsRepository],
})
export class ClubApplicationsModule {}
