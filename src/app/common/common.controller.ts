// import { HttpAdapterHost } from '@nestjs/core';
import { Controller, Get, Res } from '@nestjs/common';
import { CommonService } from './common.service';
import { FastifyReply } from 'fastify';

@Controller()
export class CommonController {
  constructor(
    private readonly commonService: CommonService // , private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  @Get('/')
  getHello(): string {
    return this.commonService.getHello();
  }

  @Get('loginTester')
  // @Redirect('/auth/login')
  redirect(@Res() fastifyReply: FastifyReply) {
    // const fastify = this.httpAdapterHost.httpAdapter;
    // console.log('Method = ', fastifyReply.request.method);
    fastifyReply.code(302).redirect('/auth/login?loginId=tester@unknown.com');
    // fastifyReply.code(200).send('OK!');
  }
}
