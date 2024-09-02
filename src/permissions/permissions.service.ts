import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionsService {
  async seed() {
    // await this.seederService.seed();
    console.log('PermissionsService seed');
  }
}
