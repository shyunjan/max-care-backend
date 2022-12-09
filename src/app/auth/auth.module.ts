// import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/configuration';
import { AuthController } from './auth.controller';
import CommonModule from '../common/common.module';
import UsersModule from '../users/users.module';
import { AuthService } from './auth.service';
import JwtStrategy from './infra/jwt.strategy';

const { SECRET: ACCESS_TOKEN_SECRET, TTL: ACCESS_TOKEN_TTL } = config.auth.ACCESS_TOKEN;

@Module({
  imports: [
    CommonModule,
    PassportModule,
    JwtModule.register({
      secret: ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: `${ACCESS_TOKEN_TTL}s` },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  /* CacheInterceptor는 response data를 caching한다. 단, GET endpoint reponse data만 캐싱되며, 
     native HTTP adapter(express, fastify)의 response object도 캐싱되지 않는다. */
  // providers: [AuthService, { provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
  providers: [AuthService, JwtStrategy],
  // exports: [AuthService],
})
export default class AuthModule {}
