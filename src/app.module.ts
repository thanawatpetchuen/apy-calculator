import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoolModule } from './pool/pool.module';
import { ApyModule } from './apy/apy.module';
import { UniswapModule } from './uniswap/uniswap.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
        };
      },
      inject: [ConfigService],
    }),
    PoolModule,
    ApyModule,
    UniswapModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
