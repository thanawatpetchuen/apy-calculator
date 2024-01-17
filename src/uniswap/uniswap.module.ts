import { Logger, Module } from '@nestjs/common';
import { UniswapService } from './uniswap.service';

@Module({
  providers: [UniswapService, Logger],
  exports: [UniswapService],
})
export class UniswapModule {}
