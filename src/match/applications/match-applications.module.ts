import { Module } from '@nestjs/common';

import { MatchApplicationsController } from './match-applications.controller';
import { MatchApplicationsService } from './match-applications.service';
import { MatchApplicationsRepository } from './match-applications.repository';

@Module({
  controllers: [MatchApplicationsController],
  providers: [MatchApplicationsService, MatchApplicationsRepository],
})
export class MatchApplicationsModule {}
