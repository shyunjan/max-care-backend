import { Module } from '@nestjs/common';
// import * as RedisStore from 'cache-manager-ioredis';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
// import { AuthService } from '../auth/auth.service';

export const clientOfRedis = Symbol('clients');

@Module({
  imports: [
    // CacheModule.register({
    //   store: RedisStore,
    //   host: 'localhost',
    //   port: 12379,
    //   isGlobal: true,
    //   ttl: 0, // seconds, { ttl: 0 } disable expiration of the cache
    //   max: 100, // maximum number of items in cache
    // }),
    // AuthService,
  ],
  controllers: [CommonController],
  providers: [CommonService],
})
export default class CommonModule {}
