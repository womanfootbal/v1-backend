import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class GetClubDetailsParamRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly clubId: number;
}
