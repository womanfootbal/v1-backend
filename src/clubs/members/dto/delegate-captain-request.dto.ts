import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DelegateCaptainParamRequestDto {
  @ApiProperty()
  @Type(() => Number)
  readonly clubId: number;

  @ApiProperty()
  @Type(() => Number)
  readonly memberId: number;
}
