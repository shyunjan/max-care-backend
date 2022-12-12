import { ValidationPipe, Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { fastifyRequestContextPlugin } from '@fastify/request-context';
// import winston from 'winston';
// import { WinstonModule, utilities as nestWinstonUtilities } from 'nest-winston';
import { defaultValidationOptions } from './init';
import config, { APP_PHASE_PROPERTY } from './config/configuration';
// import addFastifyHooks from './app/common/hooks';
import HttpAppModule from './app/httpApp.module';
import AllExceptionsFilter from './app/common/error/AllExceptionsFilter';
import AppLogger from './app/common/logger/Logger';
import { getModuleFileName } from './app/common/util/commonUtil';
import { SuccessInterceptor } from './interceptors/sucess.interceptor';
import { UndefinedToNullInterceptor } from './interceptors/undefinedToNull.interceptor';

async function bootstrapHttpApp() {
  const fastifyAdapter = new FastifyAdapter();
  // addFastifyHooks(fastifyAdapter.getInstance());

  const httpApp: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(
    HttpAppModule,
    fastifyAdapter,
    {
      // logger: WinstonModule.createLogger({
      //   transports: [
      //     new winston.transports.Console({
      //       level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      //       // process.env.NODE_ENV === 'production' ? ['error', 'warn', 'log'] : ['error', 'warn', 'log', 'verbose', 'debug'],
      //       format: winston.format.combine(
      //         // winston.format.timestamp({ format: 'YYYY-MM-dd HH:mm:ss:SSS' }),
      //         winston.format.timestamp({ format: 'HH:mm:ss:SSS' }),
      //         nestWinstonUtilities.format.nestLike('Max-Care', { prettyPrint: true, colors: true })
      //       ),
      //     }),
      //   ],
      // }),
      logger: new AppLogger(),
    }
    // { cors: true }
  );
  const logger = new Logger(getModuleFileName(__filename));
  logger.log(`process.env.${APP_PHASE_PROPERTY} = ${process.env[APP_PHASE_PROPERTY]}`);

  // httpApp.enableCors();
  await httpApp.register(fastifyCookie, { secret: config.auth.COOKIE_SECRET });
  await httpApp.register(fastifyRequestContextPlugin);

  httpApp.useGlobalPipes(new ValidationPipe(defaultValidationOptions));
  httpApp.useGlobalFilters(new AllExceptionsFilter(httpApp.get(HttpAdapterHost)));
  // httpApp.useLogger(httpApp.get(WINSTON_MODULE_NEST_PROVIDER));
  httpApp.useGlobalInterceptors(new SuccessInterceptor(), new UndefinedToNullInterceptor());

  await httpApp.listen(80, '0.0.0.0');
  // await httpApp.listen(3000);
}

bootstrapHttpApp();
