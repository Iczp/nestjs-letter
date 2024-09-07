import { Injectable, Logger } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

// const asyncLocalStorage = new AsyncLocalStorage();
@Injectable()
export class RequestContext {
  private readonly asyncLocalStorage: AsyncLocalStorage<any>;

  constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage();

    Logger.error(this.asyncLocalStorage, 'RequestContext');
  }

  run(context: any, callback: () => void): void {
    console.log('run', context);
    this.asyncLocalStorage.run(context, callback);
    console.log(
      'RequestContext this.asyncLocalStorage.getStore()',
      this.asyncLocalStorage.getStore(),
    );
  }

  get user(): any {
    return this.asyncLocalStorage.getStore()?.user;
  }

  set user(user: any) {
    const store = this.asyncLocalStorage.getStore();
    console.log('set user[store]', store);
    console.log('set user[user]', user);
    if (store) {
      store.user = user;
    }
  }
}
