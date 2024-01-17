import { ConfigService } from '@nestjs/config';
import { TestBed } from '@automock/jest';
import * as request from 'graphql-request';

import { UniswapService } from './uniswap.service';

describe('UniswapService', () => {
  let service: UniswapService;

  beforeAll(() => {
    const { unit } = TestBed.create(UniswapService)
      .mock(ConfigService)
      .using({
        get: () => 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
      })
      .compile();

    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHistoricalData', () => {
    it('should return an array of pool day data objects', async () => {
      // Arrange
      const poolId = 'your-pool-id';
      const expectedData = [
        { feesUSD: 100, tvlUSD: 1000 },
        { feesUSD: 200, tvlUSD: 2000 },
      ];
      const mockResponse = { poolDayDatas: expectedData };
      jest.spyOn(request, 'request').mockResolvedValue(mockResponse);

      // Act
      const result = await service.getHistoricalData(poolId);

      // Assert
      expect(result).toEqual(expectedData);
      expect(request.request).toHaveBeenCalledWith(
        'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
        expect.any(String),
        { poolId: poolId },
      );
    });

    it('should throw an error if there was an error fetching the data', async () => {
      const poolId = 'your-pool-id';

      const mockError = new Error('Failed to fetch data');

      jest.spyOn(request, 'request').mockRejectedValue(mockError);

      await expect(service.getHistoricalData(poolId)).rejects.toThrow(
        mockError,
      );

      expect(request.request).toHaveBeenCalledWith(
        'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
        expect.any(String),
        { poolId: poolId },
      );
    });
  });
});
