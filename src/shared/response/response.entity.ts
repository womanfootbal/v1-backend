import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { ResponseStatus } from './response-status';

export class ResponseEntity<T> {
  @Exclude() private readonly _statusCode: string;

  @Exclude() private readonly _message: string;

  @Exclude() private readonly _data: T;

  private constructor(status: ResponseStatus, message: string, data: T) {
    this._statusCode = ResponseStatus[status];
    this._message = message;
    this._data = data;
  }

  static OK(message?: string): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.OK, message || '', '');
  }

  static OK_WITH<T>(data: T, message?: string): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, message || '', data);
  }

  @ApiProperty()
  @Expose()
  get statusCode(): string {
    return this._statusCode;
  }

  @ApiProperty()
  @Expose()
  get message(): string {
    return this._message;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }
}
