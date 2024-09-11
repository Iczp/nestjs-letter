import { isEmpty } from 'src/common/validator';
import { UserDto } from 'src/users/users.dto';
import { IService } from './IService';

export class BaseService implements IService {
  constructor() {}
  protected request: any;
  setRequest(req: any) {
    this.request = req;
  }

  protected loginUser: UserDto = {
    id: '59a660ee-6e7e-11ef-84f2-6b70bce8103f',
    name: 'admin',
    account: 'admin',
  };

  public checkPolicy(prolicyName: string): Promise<void> {
    if (isEmpty(prolicyName)) {
      return;
    }
    // throw new ForbiddenException();
  }
}
