import { Gender } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gender)
  readonly gender: Gender;
}
