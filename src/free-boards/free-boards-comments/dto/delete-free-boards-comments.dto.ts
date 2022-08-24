import { PartialType } from '@nestjs/swagger';
import { UpdateFreeBoardsCommentsParamDto } from './update-free-boards-comments.dto';

export class DeleteFreeBoardsParamDto extends PartialType(
  UpdateFreeBoardsCommentsParamDto,
) {}
