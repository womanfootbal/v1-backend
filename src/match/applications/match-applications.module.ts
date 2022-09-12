import { Module } from '@nestjs/common';

import { MatchModule } from '@src/match/match.module';
import { ClubMembersModule } from '@src/clubs/members/club-members.module';

import { MatchApplicationsController } from './match-applications.controller';
import { MatchApplicationsService } from './match-applications.service';
import { MatchApplicationsRepository } from './match-applications.repository';

@Module({
  imports: [MatchModule, ClubMembersModule],
  controllers: [MatchApplicationsController],
  providers: [MatchApplicationsService, MatchApplicationsRepository],
})
export class MatchApplicationsModule {}
