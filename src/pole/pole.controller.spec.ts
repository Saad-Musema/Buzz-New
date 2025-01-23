import { Test, TestingModule } from '@nestjs/testing';
import { PoleController } from './pole.controller';
import { PoleService } from './pole.service';

describe('PoleController', () => {
  let controller: PoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoleController],
      providers: [PoleService],
    }).compile();

    controller = module.get<PoleController>(PoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
