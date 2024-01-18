import { Module } from '@nestjs/common';
import { PoolService } from './pool.service';
import { PoolController } from './pool.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pool, PoolSchema } from 'src/schemas/pool.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pool.name, schema: PoolSchema }]),
  ],
  controllers: [PoolController],
  providers: [PoolService],
  exports: [PoolService],
})
export class PoolModule {}
