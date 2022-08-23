import { Injectable } from '@nestjs/common';
import { FreeboardsRepository } from './freeboards.repository';
import { CreateFreeboardsDto } from './dto/create-freeboards.dto';

@Injectable()
export class FreeboardsService {
  constructor(private readonly freeboardsRepository: FreeboardsRepository) {}

  create(createFreeboardsDto: CreateFreeboardsDto) {
    return this.freeboardsRepository.create(createFreeboardsDto);
  }
  
  findMany() {
    return this.freeboardsRepository.findMany();
  }

  findUnique(id: number) {
    return this.freeboardsRepository.findUnique(id);
  }
}
