import { Logger } from '@nestjs/common';
import { FastifyInstance } from 'fastify';
import { getModuleFileName } from '../app/common/util/commonUtil';
import moment from 'moment';

const logger = new Logger(getModuleFileName(__filename));

export default function addLoggerHook(server: FastifyInstance): FastifyInstance {
  return server.addHook('onResponse', (request, response, next) => {
    const { ip, method, url, body, headers } = request;
    const { statusCode } = response;
    const time = moment().format('YYYY-MM-DD HH:mm:ss');

    logger.log(
      `${time} method : ${method}, originalUrl : ${url}, statusCode : ${statusCode}, ip: ${ip}, content-type : ${
        headers['content-type']
      }, body : ${JSON.stringify(body)}`
    );

    next();
  });
}
