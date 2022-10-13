// import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import CommonModule from '../common/common.module';
import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  /* CacheInterceptor는 response data를 caching한다. 단, GET endpoint reponse data만 캐싱되며, 
     native HTTP adapter(express, fastify)의 response object도 캐싱되지 않는다. */
  // providers: [AuthService, { provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
  // exports: [AuthService],
})
export default class AuthModule {}
