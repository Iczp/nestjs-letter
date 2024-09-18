import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ErpUsersService } from 'src/erp-users/erp-users.service';
import { JwtService } from '@nestjs/jwt';
import { isGuid } from 'src/common/validator';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/auth/jwtConstants';
import { UsersService } from 'src/users/user.service';
import { Assert } from 'src/common';

@Injectable()
export class ErpUserIdMiddleware implements NestMiddleware {
  constructor(
    private readonly erpUsersService: ErpUsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const erpUserId = req.headers['x-user-id'] as string;
    Logger.log(`x-user-id:${erpUserId}`, ErpUserIdMiddleware.name);
    if (erpUserId) {
      Assert.If(!isGuid(erpUserId), 'x-user-id is not guid', 401);
      let user: { id: string } =
        await this.usersService.findOneByErpUserId(erpUserId);
      if (!user) {
        const erpUser = await this.erpUsersService.findOne(erpUserId);

        Assert.If(!erpUser, `erp_user not found,erpUserId:${erpUserId}`, 401);

        const ret = await this.usersService.createIfNotContains({
          account: erpUser.employeeNo,
          passoword: erpUser.employeeNo,
          name: erpUser.name,
          userType: 'Unset',
          gender: erpUser.gender == '1' ? 'Female' : 'Male',
          phone: erpUser.mobile,
          is_enabled: true,
          erp_user_id: erpUserId,
        });
        user = ret.user;
        Logger.log(
          `Create user from erp_user, erp_user_id: ${user.id}, user_id:${user.id}`,
          ErpUserIdMiddleware.name,
        );
      }
      const payload = { sub: user.id, type: 'ERPUSER' };
      const privateKey = this.configService.get<string>(JWT_SECRET);
      const accessToken = this.jwtService.sign(payload, {
        privateKey,
        expiresIn: '3600s',
      });
      req.headers['authorization'] = `Bearer ${accessToken}`;
    }

    next();
  }
}
