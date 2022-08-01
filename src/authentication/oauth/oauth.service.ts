import { Injectable } from '@nestjs/common';

import { OauthRepository } from './oauth.repository';

@Injectable()
export class OauthService {
  constructor(private readonly oauthRepository: OauthRepository) {}

  getById(id: string) {
    return this.oauthRepository.getById(id);
  }
}
