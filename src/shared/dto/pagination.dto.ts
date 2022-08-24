import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export abstract class PaginationDto {
  @ApiProperty()
  @Type(() => Number)
  readonly page: number;

  @ApiProperty()
  @Type(() => Number)
  readonly pageSize: number;
}
