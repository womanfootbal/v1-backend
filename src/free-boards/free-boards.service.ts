import { ForbiddenException, Injectable } from '@nestjs/common';
import { FreeBoardsRepository } from './free-boards.repository';
import { CreateFreeBoardsDto } from './dto/create-free-boards.dto';
import { UpdateFreeBoardsDto } from './dto/update-free-boards.dto';

@Injectable()
export class FreeBoardsService {
  constructor(private readonly freeBoardsRepository: FreeBoardsRepository) {}

  async create(userId: number, createFreeBoardsDto: CreateFreeBoardsDto) {
    const createData = {
    'title': createFreeBoardsDto.title,
    'contents': createFreeBoardsDto.contents,
    'userId': userId
  }

    return this.freeBoardsRepository.create(createData);
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

    if (userId !== freeBoard.userId) {
      throw new ForbiddenException('게시글의 소유자만 수정할 수 있습니다.');
    }
    return this.freeBoardsRepository.update(id, updateFreeBoardsDto);
  }

  async delete(id: number, userId: number) {
    const freeBoard = await this.findById(id);

    if (userId !== freeBoard.userId) {
      throw new ForbiddenException('게시글의 소유자만 삭제할 수 있습니다.');
    }
    return this.freeBoardsRepository.delete(id);
  }
}
