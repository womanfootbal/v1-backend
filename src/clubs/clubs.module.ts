import { Module } from '@nestjs/common';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { ClubsRepository } from './clubs.repository';
import { IClubsRepository } from './clubs-repository.interface';

@Module({
  controllers: [ClubsController],
  providers: [
    ClubsService,
    {
      provide: IClubsRepository,
      useClass: ClubsRepository,
    },
  ],
})
export class ClubsModule {}
