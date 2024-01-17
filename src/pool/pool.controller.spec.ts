import { PoolController } from './pool.controller';
import { TestBed } from '@automock/jest';

describe('PoolController', () => {
  let controller: PoolController;

  beforeEach(async () => {
    const { unit } = TestBed.create(PoolController).compile();

    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
