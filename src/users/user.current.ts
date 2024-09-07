import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/UserDto';

@Injectable()
export class CurrentUser {
  constructor() {}
  private currentUser: UserDto | undefined;
  public get user(): UserDto | undefined {
    return this.currentUser;
  }

  public set user(user: UserDto) {
    this.currentUser = user;
  }
}
