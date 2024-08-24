import { Module } from '@nestjs/common';
import { PublicGuard } from './public.guard';
import { ApiKeyGuard } from './api-key.guard';
@Module({
  providers: [PublicGuard, ApiKeyGuard],
  exports: [PublicGuard, ApiKeyGuard], // 导出以便在其他模块中使用
})
export class GuardsModule {}
