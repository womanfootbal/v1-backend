import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetMatchesQueryRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly date: Date;
}
