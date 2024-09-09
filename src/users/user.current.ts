import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from './dtos/UserDto';

@Injectable()
export class CurrentUser {
  constructor() {}
  private currentUser: UserDto | undefined;
  public get user(): UserDto | undefined {
    console.log(this.currentUser, 'get this.currentUser');

    return this.currentUser;
  }

  public get id(): string | undefined {
    return this.user?.id;
  }

  public get account(): string | undefined {
    return this.user?.account;
  }

  public get name(): string | undefined {
    return this.user?.name;
  }

  public get erp_user_id(): string | undefined {
    return this.user?.erp_user_id;
  }

  public get is_enabled(): boolean | undefined {
    return this.user?.is_enabled;
  }

  public set user(user: any) {
    Logger.log(user, 'currentuser set');
    this.currentUser = {
      id: user.id,
      account: user.name,
      name: user.name,
    };
    Logger.log(this.currentUser, 'currentuser set');
  }
}
