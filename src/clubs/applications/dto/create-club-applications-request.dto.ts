import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateClubApplicationsBodyRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly clubId: number;
}
