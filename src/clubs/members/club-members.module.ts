import { Module } from '@nestjs/common';

import { ClubMembersService } from './club-members.service';
import { ClubMembersRepository } from './club-members.repository';
import { ClubMembersController } from './club-members.controller';

@Module({
  controllers: [ClubMembersController],
  providers: [ClubMembersService, ClubMembersRepository],
  exports: [ClubMembersService],
})
export class ClubMembersModule {}
