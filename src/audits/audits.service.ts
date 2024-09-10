import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/bases/BaseService';

@Injectable()
export class AuditsService extends BaseService {
  constructor() {
    super();
  }
}
