import { Module } from '@nestjs/common';

import { ApyService } from './apy.service';
import { ApyController } from './apy.controller';
import { UniswapModule } from 'src/uniswap/uniswap.module';
import { PoolModule } from 'src/pool/pool.module';

@Module({
  imports: [UniswapModule, PoolModule],
  controllers: [ApyController],
  providers: [ApyService],
})
export class ApyModule {}
