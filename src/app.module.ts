import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ActivityCustomerModule } from './activity-customers/activity-customer.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SeedModule } from './seed/seed.module';
import { RolesModule } from './roles/roles.module';
import { AuditsModule } from './audits/audits.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ActivitiesModule } from './activities/activities.module';
import { LoggerModule } from './logger/logger.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CurrentUser } from './users/users.current';
import { jwtConstants } from './auth/jwtConstants';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }, // 设置token的过期时间
    }),
    ConfigModule.forRoot({
      isGlobal: true, // 使 ConfigModule 在整个应用程序中全局可用
    }),
    UsersModule,
    ActivitiesModule,
    ActivityCustomerModule,
    PermissionsModule,
    AuthModule,
    SeedModule,
    RolesModule,
    AuditsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // 默认应用 API Key 守卫
    },
    AppService,
    CurrentUser,
  ],
  exports: [],
})
export class AppModule {}
