import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ActivityCustomerModule } from './activity-customers/activity-customer.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { RolesModule } from './roles/roles.module';
import { AuditsModule } from './audits/audits.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ActivitiesModule } from './activities/activities.module';
import { LoggerModule } from './logger/logger.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CurrentUser } from './users/users.current';
import { AuditInterceptor } from './audits/AuditInterceptor';
import { AllExceptionsFilter } from './common/AllExceptionsFilter';
import { AuditsService } from './audits/audits.service';
// import { LocalAuthGuard } from './auth/local-auth.guard';
// import { LocalStrategy } from './auth/local.strategy';
// import { JwtStrategy } from './auth/jwt.strategy';
// import { UsersService } from './users/user.service';
// import { AuthService } from './auth/auth.service';
import { ErpUsersModule } from './erp-users/erp-users.module';
import { ErpUsersService } from './erp-users/erp-users.service';
import { ErpUserIdMiddleware } from './erp-users/ErpUserIdMiddleware';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/user.service';
import { InviterConfigModule } from './inviter-config/inviter-config.module';
import { ActivityCustomerInvitersModule } from './activity-customer-inviters/activity-customer-inviters.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
    ConfigModule.forRoot({
      isGlobal: true, // 使 ConfigModule 在整个应用程序中全局可用
    }),
    UsersModule,
    ActivitiesModule,
    ActivityCustomerModule,
    ActivityCustomerInvitersModule,
    PermissionsModule,
    AuthModule,
    SeedModule,
    RolesModule,
    AuditsModule,
    LoggerModule,
    ErpUsersModule,
    InviterConfigModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      // 默认应用 API Key 守卫
      provide: APP_GUARD,
      // useClass: LocalAuthGuard,
      useClass: JwtAuthGuard,
    },
    AppService,
    AuditsService,
    ErpUsersService,
    JwtService,
    UsersService,
    // LocalStrategy,
    // JwtStrategy,
    // UsersService,
    // AuthService,
    CurrentUser,
  ],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ErpUserIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // 对所有路由和所有请求方法应用中间件
  }
}
