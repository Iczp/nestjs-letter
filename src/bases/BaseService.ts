import { UserDto } from 'src/users/users.dto';
import { IService } from './IService';
import { Assert } from 'src/common';

export class BaseService implements IService {
  constructor() {}
  protected request: any;
  setRequest(req: any) {
    this.request = req;
  }

  protected get currentUserId() {
    const currentUserId = this.request?.user?.id;
    Assert.If(!currentUserId, '获取登录用户失败');
    return currentUserId;
  }

  protected loginUser: UserDto = {
    id: '59a660ee-6e7e-11ef-84f2-6b70bce8103f',
    name: 'admin',
    account: 'admin',
  };
}
