import { Injectable } from '@nestjs/common';
import { UniswapService } from 'src/uniswap/uniswap.service';

@Injectable()
export class ApyService {
  constructor(private readonly uniswapService: UniswapService) {}
  /**
   * Calculate the Annual Percentage Yield (APY) for a given Uniswap pool.
   * @param {string} poolAddress - The address of the Uniswap pool.
   * @returns {number} - The APY calculated based on the historical data of the pool.
   */
  async calculateAPY(poolAddress: string): Promise<number> {
    // Get the historical data for the pool
    const data = await this.uniswapService.getHistoricalData(poolAddress);

    // If there is no historical data, return 0
    if (data.length === 0) {
      return 0;
    }

    // Extract the feesUSD and tvlUSD from the first entry in the historical data
    const { feesUSD, tvlUSD } = data[0];

    // If the total value locked (tvlUSD) is 0, return 0
    if (tvlUSD === 0) {
      return 0;
    }

    // Calculate the annual fee income and total liquidity
    const annualFeeIncome = feesUSD;
    const totalLiquidity = tvlUSD;

    // Calculate the APY as a percentage
    const apy = (annualFeeIncome / totalLiquidity) * 100;

    // Return the calculated APY
    return apy;
  }
}
