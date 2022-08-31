import { Module } from '@nestjs/common';

import { ClubMembersService } from './club-members.service';
import { ClubMembersRepository } from './club-members.repository';

@Module({
  providers: [ClubMembersService, ClubMembersRepository],
  exports: [ClubMembersService],
})
export class ClubMembersModule {}
