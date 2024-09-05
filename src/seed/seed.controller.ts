import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/bases/BaseController';
import { SeedService } from './seed.service';

@Controller('seed')
@ApiTags('Seed')
export class SeedController extends BaseController {
  constructor(readonly service: SeedService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  public seed() {
    return this.service.seed();
  }
}
