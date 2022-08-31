import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateClubApplicationsStatusToCompletedParamRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly applicationId: number;
}
