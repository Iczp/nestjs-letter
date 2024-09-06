import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}
  async onModuleInit() {
    Logger.log('onModuleInit', 'SeedModule');
    // await this.seedService.seed();
  }
}
