import { Module } from '@nestjs/common';
import { InviterConfigService } from './inviter-config.service';
import { InviterConfigController } from './inviter-config.controller';

@Module({
  controllers: [InviterConfigController],
  providers: [InviterConfigService],
})
export class InviterConfigModule {}
