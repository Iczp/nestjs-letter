import { Inject, Injectable } from '@nestjs/common';
import {
  version,
  name,
  author,
  email,
  website,
  description,
} from '../package.json';
import { AppInfo } from './dtos/AppInfo';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AppService {
  constructor(
    @Inject(REQUEST)
    private request: Request,
  ) {}

  getAppInfo(): AppInfo {
    console.log(this.request.body, 'request.body');
    return {
      name,
      version,
      description,
      author,
      email,
      website,
    };
  }
  getHome(): string {
    return `Hello World: init`;
  }
}
