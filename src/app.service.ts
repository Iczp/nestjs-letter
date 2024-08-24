import { Injectable } from '@nestjs/common';
import {
  version,
  name,
  author,
  email,
  website,
  description,
} from '../package.json';
import { AppInfo } from './dtos/AppInfo';

@Injectable()
export class AppService {
  getAppInfo(): AppInfo {
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
