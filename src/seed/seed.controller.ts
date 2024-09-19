import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/bases/BaseController';
import { SeedService } from './seed.service';

@Controller('seed')
@ApiTags('Seed 种子数据管理')
export class SeedController extends BaseController {
  constructor(readonly service: SeedService) {
    super(service);
  }

  @Post()
  @ApiOperation({ summary: '种子数据' })
  public seed() {
    return this.service.seed();
  }
}
