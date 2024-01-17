import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pool } from 'src/schemas/pool.schema';
import { CreatePoolDto } from './dto/create-pool.dto';

@Injectable()
export class PoolService {
  constructor(
    @InjectModel(Pool.name)
    private poolModel: Model<Pool>,
  ) {}

  create(createPoolDto: CreatePoolDto): Promise<Pool> {
    const createdPool = new this.poolModel(createPoolDto);
    return createdPool.save();
  }

  findAll(): Promise<Pool[]> {
    return this.poolModel.find().exec();
  }

  findOne(id: string): Promise<Pool> {
    return this.poolModel.findById(id);
  }

  findByAddress(address: string): Promise<Pool> {
    return this.poolModel.findOne({ address });
  }

  remove(address: string) {
    return this.poolModel.findOneAndDelete({ address });
  }
}
