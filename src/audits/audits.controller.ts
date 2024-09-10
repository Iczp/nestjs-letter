import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BaseController } from 'src/bases/BaseController';
import { AuditsService } from './audits.service';

@Controller('audits')
@ApiTags('Audits')
export class AuditsController extends BaseController {
  constructor(protected auditsService: AuditsService) {
    super(auditsService);
  }
}
