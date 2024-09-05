import { Module, OnModuleInit } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

@Module({
  providers: [PermissionsService],
})
export class PermissionsModule implements OnModuleInit {
  constructor(private readonly permissionsService: PermissionsService) {}
  providers: [PermissionsService];

  async onModuleInit() {
    console.log('onModuleInit');
    await this.permissionsService.seed();
  }
}
