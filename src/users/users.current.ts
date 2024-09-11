import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CurrentUser {
  private currentUser: any;

  public get user(): any {
    return this.currentUser || { id: 'undefined' };
  }

  public set user(user: any) {
    this.currentUser = user;
    Logger.log(`set user:${JSON.stringify(user)}`, CurrentUser.name);
  }
}
