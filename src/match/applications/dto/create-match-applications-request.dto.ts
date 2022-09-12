import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateMatchApplicationsRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly matchId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly clubId: number;
}
