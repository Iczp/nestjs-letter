import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { ActivityModule } from './activity/activity.module';
import { ActivityCustomerModule } from './activityCustomer/activityCustomer.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SeedModule } from './seed/seed.module';
import { RolesModule } from './roles/roles.module';
import { AuditsModule } from './audits/audits.module';
import { CurrentUser } from './users/user.current';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' }, // 设置token的过期时间
    }),
    ConfigModule.forRoot({
      isGlobal: true, // 使 ConfigModule 在整个应用程序中全局可用
    }),
    UserModule,
    ActivityModule,
    ActivityCustomerModule,
    PermissionsModule,
    AuthModule,
    SeedModule,
    RolesModule,
    AuditsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CurrentUser],
  exports: [CurrentUser],
})
export class AppModule {}
