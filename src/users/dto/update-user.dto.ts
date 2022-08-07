import { Gender } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUserRequestDto {
  @IsNotEmpty()
  @IsEnum(Gender)
  readonly gender: Gender;

  readonly userId: number;
}
