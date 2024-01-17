import { ApyController } from './apy.controller';
import { TestBed } from '@automock/jest';
import { ApyService } from './apy.service';
import { BadRequestException } from '@nestjs/common';
import { PoolService } from 'src/pool/pool.service';
import { Pool } from 'src/schemas/pool.schema';
import { Model } from 'mongoose';

describe('ApyController', () => {
  let controller: ApyController;
  let apyService: jest.Mocked<ApyService>;
  let poolService: jest.Mocked<PoolService>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(ApyController).compile();

    controller = unit;
    apyService = unitRef.get(ApyService);
    poolService = unitRef.get(PoolService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get apy', () => {
    it('should return apy successfully', async () => {
      const poolAddress = '0x123456789';

      poolService.findByAddress.mockResolvedValue({ address: '0x123456789' });
      apyService.calculateAPY.mockResolvedValue(10.0);

      expect(await controller.calculateAPY(poolAddress)).toStrictEqual({
        apy: 10,
      });
    });

    it('should return error when no poolAddress', async () => {
      const poolAddress = '';

      await expect(controller.calculateAPY(poolAddress)).rejects.toThrow(
        new BadRequestException('Pool address is required'),
      );
    });

    it('should return not found error when address is not found', async () => {
      const poolAddress = '0x123456789';

      poolService.findByAddress.mockResolvedValue(null);

      await expect(controller.calculateAPY(poolAddress)).rejects.toThrow(
        'Pool not found',
      );
    });

    it('should return error when calculateAPY is thrown other error', async () => {
      const poolAddress = '0x123456789';

      poolService.findByAddress.mockResolvedValue({ address: '0x123456789' });
      apyService.calculateAPY.mockRejectedValue(new Error('mock error'));

      await expect(controller.calculateAPY(poolAddress)).rejects.toThrow(
        'Error calculating APY',
      );
    });
  });
});
