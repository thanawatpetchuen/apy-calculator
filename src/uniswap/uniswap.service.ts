import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { request, gql } from 'graphql-request';
import { PoolDayDatasResponse } from './uniswap.interface';

@Injectable()
export class UniswapService {
  private subgraphURL: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.subgraphURL = this.configService.get('UNISWAP_SUBGRAPH_URL');
  }

  /**
   * Retrieves historical data for a specific pool.
   * @param poolId - The ID of the pool.
   * @returns An array of pool day data objects.
   * @throws If there was an error fetching the data.
   */
  async getHistoricalData(poolId: string) {
    const query = gql`
      query GetPoolData($poolId: ID!) {
        poolDayDatas(
          orderBy: date
          orderDirection: desc
          where: { pool_: { id: $poolId } }
        ) {
          feesUSD
          tvlUSD
        }
      }
    `;

    try {
      const result = await request<PoolDayDatasResponse>(
        this.subgraphURL,
        query,
        {
          poolId,
        },
      );

      return result.poolDayDatas;
    } catch (error) {
      this.logger.error('Error fetching data:', error);
      throw error;
    }
  }
}
