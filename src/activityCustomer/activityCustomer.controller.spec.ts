import { Test, TestingModule } from '@nestjs/testing';
import { ActivityCustomerController } from './activityCustomer.controller';

describe('ActivityCustomerController', () => {
  let controller: ActivityCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityCustomerController],
    }).compile();

    controller = module.get<ActivityCustomerController>(
      ActivityCustomerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
