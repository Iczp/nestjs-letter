import { Test, TestingModule } from '@nestjs/testing';
import { ActivityCustomerService } from './activityCustomer.service';

describe('ActivityCustomerService', () => {
  let service: ActivityCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityCustomerService],
    }).compile();

    service = module.get<ActivityCustomerService>(ActivityCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
