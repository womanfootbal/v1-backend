import { PartialType } from '@nestjs/swagger';
import { UpdateFreeBoardsParamDto } from './update-free-boards.dto';

export class DeleteFreeBoardsParamDto extends PartialType(
  UpdateFreeBoardsParamDto,
) {}
