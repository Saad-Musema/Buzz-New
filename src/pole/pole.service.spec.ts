import { Test, TestingModule } from '@nestjs/testing';
import { PoleService } from './pole.service';

describe('PoleService', () => {
  let service: PoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoleService],
    }).compile();

    service = module.get<PoleService>(PoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
