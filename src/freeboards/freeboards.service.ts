import { Injectable } from '@nestjs/common';
import { CreateFreeboardDto } from './dto/create-freeboard.dto';

@Injectable()
export class FreeboardsService {
  private freeboards: Freeboard[] = [];

  create(freeboardData: CreateFreeboardDto) {
    this.freeboards.push({
      id: this.freeboards.length + 1,
      ...freeboardData,
    });
  }
}
