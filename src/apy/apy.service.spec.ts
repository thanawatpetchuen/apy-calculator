import { ApyService } from './apy.service';
import { UniswapService } from 'src/uniswap/uniswap.service';
import { TestBed } from '@automock/jest';

describe('ApyService', () => {
  let service: ApyService;
  let uniswapService: jest.Mocked<UniswapService>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(ApyService).compile();

    service = unit;
    uniswapService = unitRef.get(UniswapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculate apy', () => {
    it('should return 0 if data is empty', async () => {
      const poolAddress = '0x123456789';
      uniswapService.getHistoricalData.mockResolvedValue([]);

      const result = await service.calculateAPY(poolAddress);

      expect(result).toBe(0);
    });

    it('should return 0 if tvlUSD is 0', async () => {
      const poolAddress = '0x123456789';
      uniswapService.getHistoricalData.mockResolvedValue([
        { feesUSD: 100, tvlUSD: 0 },
      ]);

      const result = await service.calculateAPY(poolAddress);

      expect(result).toBe(0);
    });

    it('should calculate APY correctly', async () => {
      const poolAddress = '0x123456789';
      uniswapService.getHistoricalData.mockResolvedValue([
        { feesUSD: 100, tvlUSD: 1000 },
      ]);

      const result = await service.calculateAPY(poolAddress);

      expect(result).toBe(10);
    });
  });
});
