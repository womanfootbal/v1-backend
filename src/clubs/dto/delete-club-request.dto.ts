import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class DeleteClubParamRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly clubId: number;
}
