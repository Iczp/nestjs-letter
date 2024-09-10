import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CurrentUser {
  private currentUser: any;

  public get user(): any {
    return this.currentUser;
  }

  public set user(user: any) {
    this.currentUser = user;
    Logger.log(user, CurrentUser.name);
  }
}
