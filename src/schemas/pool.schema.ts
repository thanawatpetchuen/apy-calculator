import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PoolDocument = HydratedDocument<Pool>;

@Schema()
export class Pool {
  @Prop()
  address: string;
}

export const PoolSchema = SchemaFactory.createForClass(Pool);
