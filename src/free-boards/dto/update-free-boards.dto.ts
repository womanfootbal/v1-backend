import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateFreeBoardsDto } from './create-free-boards.dto';

export class UpdateFreeBoardsDto extends PartialType(CreateFreeBoardsDto) {}

export class UpdateFreeBoardsParamDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly freeBoardId: number;
}
