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

  findById(id: number) {
    return this.freeBoardsRepository.findById(id);
  }

  async update(
    id: number,
    userId: number,
    updateFreeBoardsDto: UpdateFreeBoardsDto,
  ) {
    const freeBoard = await this.findById(id);

    if (userId === freeBoard.userId) {
      return this.freeBoardsRepository.update(id, updateFreeBoardsDto);
    }
    return console.log('자신이 작성한 게시글의 정보만 수정할 수 있습니다.');
  }

  async delete(id: number, userId: number) {
    const freeBoard = await this.findById(id);

    if (userId === freeBoard.userId) {
      return this.freeBoardsRepository.delete(id);
    }
    return console.log('자신이 작성한 게시글의 정보만 삭제할 수 있습니다.');
  }
}
