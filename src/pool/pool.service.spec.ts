import { PoolService } from './pool.service';
import { TestBed } from '@automock/jest';

describe('PoolService', () => {
  let service: PoolService;

  beforeEach(async () => {
    const { unit } = TestBed.create(PoolService).compile();

    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
