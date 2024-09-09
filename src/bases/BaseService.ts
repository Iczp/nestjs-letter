import { isEmpty } from 'src/common/validator';

export class BaseService {
  constructor() {}

  public checkPolicy(prolicyName: string): Promise<void> {
    if (isEmpty(prolicyName)) {
      return;
    }
    // throw new ForbiddenException();
  }
}
