import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BaseController } from 'src/bases/BaseController';

@Controller('audits')
@ApiTags('Audits')
export class AuditsController extends BaseController {}
