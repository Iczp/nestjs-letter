import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

@Module({
  providers: [PermissionsService],
})
export class PermissionsModule implements OnModuleInit {
  constructor(private readonly permissionsService: PermissionsService) {}
  providers: [PermissionsService];

  async onModuleInit() {
    Logger.log('onModuleInit', 'PermissionsModule');
    await this.permissionsService.seed();
  }
}
