import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ApyService } from './apy.service';
import { PoolService } from 'src/pool/pool.service';
import { CalculateAPYResponse } from './apy.interface';

@Controller('apy')
export class ApyController {
  constructor(
    private readonly apyService: ApyService,
    private readonly poolService: PoolService,
  ) {}

  @Get()
  /**
   * Calculates the Annual Percentage Yield (APY) for a given pool.
   * @param {string} poolAddress - The address of the pool.
   * @throws {BadRequestException} - If the pool address is not provided.
   * @throws {NotFoundException} - If the pool is not found.
   * @throws {InternalServerErrorException} - If there is an error calculating the APY.
   */
  async calculateAPY(
    @Query('poolAddress') poolAddress: string,
  ): Promise<CalculateAPYResponse> {
    // Check if the pool address is provided
    if (!poolAddress) {
      throw new BadRequestException('Pool address is required');
    }

    // Find the pool by its address
    const pool = await this.poolService.findByAddress(poolAddress);

    // Check if the pool is found
    if (!pool) {
      throw new NotFoundException('Pool not found');
    }

    try {
      // Calculate the APY for the pool
      const apy = await this.apyService.calculateAPY(poolAddress);

      return { apy };
    } catch (error) {
      throw new InternalServerErrorException('Error calculating APY', error);
    }
  }
}
