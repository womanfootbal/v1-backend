import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

import { Regex } from '@shared/regex';
import { Gender } from '@prisma/client';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(Regex.PASSWORD, {
    message: '영문, 숫자, 특수문자 포함 8 - 16 자리 비밀번호가 필요합니다',
  })
  readonly password: string;

  @ApiProperty({ enum: Gender })
  @IsNotEmpty()
  @IsEnum(Gender)
  readonly gender: Gender;
}
