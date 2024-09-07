import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/UserDto';

@Injectable()
export class CurrentUser {
  constructor() {}
  private currentUser: UserDto | undefined;
  public get user(): UserDto | undefined {
    return this.currentUser;
  }

  public get id(): string | undefined {
    return this.currentUser?.id;
  }

  public get account(): string | undefined {
    return this.currentUser?.account;
  }

  public get name(): string | undefined {
    return this.currentUser?.name;
  }

  public get erp_user_id(): string | undefined {
    return this.currentUser?.erp_user_id;
  }

  public get is_enabled(): boolean | undefined {
    return this.currentUser?.is_enabled;
  }

  public set user(user: UserDto) {
    this.currentUser = user;
  }
}
