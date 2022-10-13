import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import CommonModule from './common/common.module';
// import configuration, { APP_PHASE } from 'src/config/configuration';
// import { InitiateSystemController } from '../init';
import AuthModule from './auth/auth.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   // envFilePath: ['src/config/local/env.db'],
    //   load: [configuration],
    //   isGlobal: true, // 다른 모듈에서 ConfigModule을 별도로 import할 필요없이 바로 사용할 수 있다
    //   cache: true,
    // }),
    CommonModule,
    AuthModule,
  ],
  // controllers: [InitiateSystemController],
})
export default class HttpAppModule {}
