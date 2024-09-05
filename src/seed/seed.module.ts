import { Module, OnModuleInit } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}
  async onModuleInit() {
    console.log('onModuleInit');
    await this.seedService.seed();
  }
}
