import { Injectable } from '@nestjs/common';
import { FreeBoardsRepository } from './free-boards.repository';
import { CreateFreeBoardsDto } from './dto/create-free-boards.dto';
import { UpdateFreeBoardsDto } from './dto/update-free-boards.dto';

@Injectable()
export class FreeBoardsService {
  constructor(private readonly freeBoardsRepository: FreeBoardsRepository) {}

  create(createFreeBoardsDto: CreateFreeBoardsDto) {
    return this.freeBoardsRepository.create(createFreeBoardsDto);
  }

  findMany() {
    return this.freeBoardsRepository.findMany();
  }

  findUnique(id: number) {
    return this.freeBoardsRepository.findUnique(id);
  }

  update(id: number, updateFreeBoardsDto: UpdateFreeBoardsDto) {
    return this.freeBoardsRepository.update(id, updateFreeBoardsDto);
  }

  delete(id: number) {
    return this.freeBoardsRepository.delete(id);
  }
}
