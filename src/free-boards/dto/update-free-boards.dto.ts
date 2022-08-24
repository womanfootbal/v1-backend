import { PartialType } from '@nestjs/swagger';
import { CreateFreeBoardsDto } from './create-free-boards.dto';

export class UpdateFreeBoardsDto extends PartialType(CreateFreeBoardsDto) {}
