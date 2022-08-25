import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {IsInt, IsNotEmpty, Min} from 'class-validator';

export abstract class PaginationDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly page: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly pageSize: number;
}
