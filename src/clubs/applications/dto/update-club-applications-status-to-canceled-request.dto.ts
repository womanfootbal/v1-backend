import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateClubApplicationsStatusToCanceledRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly applicationId: number;
}
