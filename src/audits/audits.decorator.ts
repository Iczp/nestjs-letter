import {
  //   createParamDecorator,
  //   ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
export const AuditingKey = 'Auditing';
export const Auditing = (enabled: boolean = true) =>
  SetMetadata(AuditingKey, enabled);
// Reflect.defineMetadata('isAuditing', true, target);
// export const CustomDecorator = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     // 在这里可以访问请求实例或执行上下文
//     return data ? request.body[data] : request.body;
//   },
// );
