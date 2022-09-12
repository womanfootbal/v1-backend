import { Module } from '@nestjs/common';

import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { MatchRepository } from './match.repository';
import { ClubMembersModule } from '../clubs/members/club-members.module';

@Module({
  imports: [ClubMembersModule],
  controllers: [MatchController],
  providers: [MatchService, MatchRepository],
  exports: [MatchService],
})
export class MatchModule {}
