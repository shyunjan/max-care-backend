import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { fastifyRequestContextPlugin } from '@fastify/request-context';
import { defaultValidationOptions } from './init';
import config from 'src/config/configuration';
import addFastifyHooks from './app/common/hooks';
import HttpAppModule from './app/http-app.module';
import AllExceptionsFilter from './app/common/error/AllExceptionsFilter';

async function bootstrapHttpApp() {
  const fastifyAdapter = new FastifyAdapter();
  addFastifyHooks(fastifyAdapter.getInstance());

  const httpApp: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(
    HttpAppModule,
    fastifyAdapter,
    { logger: ['error', 'warn', 'debug', 'log'] }
    // { cors: true }
  );
  // httpApp.enableCors();
  await httpApp.register(fastifyCookie, { secret: config.auth.COOKIE_SECRET });
  await httpApp.register(fastifyRequestContextPlugin);

  httpApp.useGlobalPipes(new ValidationPipe(defaultValidationOptions));
  httpApp.useGlobalFilters(new AllExceptionsFilter(httpApp.get(HttpAdapterHost)));

  // await app.listen(3000, '0.0.0.0');
  await httpApp.listen(3000);
}

bootstrapHttpApp();
