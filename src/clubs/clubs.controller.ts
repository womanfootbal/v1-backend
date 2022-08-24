import {
  ClubsController as Controller,
  CreateClub,
} from './clubs.controller.decorator';
import { ClubsService } from './clubs.service';

@Controller()
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @CreateClub()
  async createClub() {
    return null;
  }
}
