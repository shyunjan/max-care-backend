/**
 * 이 소스 코드는 Fastify hook을 사용해서 로그인 여부나 어드민 사용자 여부를 체크하는 소스이다.
 * NestJS의 JwtAuthGuard를 사용해서 로그인이 필요한 라우트를 지정할 수 있고, setMetaData, reflector와 Guard를 사용해서 어드민 사용자
 * 여부를 체크할 수 있으므로 이 소스는 주석처리한다.
 **/
// import { UnauthorizedException, Logger } from '@nestjs/common';
// import { FastifyInstance, RouteOptions, preValidationHookHandler } from 'fastify';
// import { requestContext } from '@fastify/request-context';
// import { verifyAccessToken } from '../auth/auth.service';
// import { ILoginInfo, UserLevel } from 'src/types';
// import { RESULT_CODE } from '../../constant';
// import CustomError from './error/CustomError';
// import { getModuleFileName } from './util/commonUtil';

// const moduleFileName = getModuleFileName(__filename);
// const logger = new Logger(moduleFileName);

// const checkAdminAuthUrl: string[] = [
//   // 어드민 권한이 필요한 API Url List
//   '/auth/get-users',
// ];
// const checkLoginAuthUrl: string[] = [
//   // 어드민 권한까지는 필요없지만 로그인이 필요한 API Url List
//   '/auth/get',
// ].concat(checkAdminAuthUrl);

// export default function addFastifyHook(server: FastifyInstance): FastifyInstance {
//   return server.addHook('onRoute', (routeOptions: RouteOptions) => {
//     const url = routeOptions.url;
//     let preValidationHooker: preValidationHookHandler[] = [];

//     if (checkLoginAuthUrl.some((u) => url.includes(u))) {
//       preValidationHooker.push(async (request, reply, done) => {
//         logger.debug('Hooking preValidation for Login Authorization...');
//         const accessToken: string | undefined = request.cookies['acc'];
//         if (accessToken) {
//           const loginInfo: ILoginInfo = await verifyAccessToken(accessToken);
//           requestContext.set('loginInfo', loginInfo);
//           requestContext.set('isLoggedIn', true);
//           requestContext.set('isAdmin', loginInfo.userLevel >= UserLevel.operator);
//         } else {
//           throw new CustomError(RESULT_CODE.AUTH_NEED_LOGIN, {
//             status: new UnauthorizedException().getStatus(),
//             context: moduleFileName,
//           });
//         }
//         // } else throw new UnauthorizedException();

//         // done();
//       });
//       if (checkAdminAuthUrl.some((u) => url.includes(u))) {
//         preValidationHooker.push(async (request, reply, done) => {
//           logger.debug('Hooking preValidation for Admin Authorization...');

//           /* 구현 예정 */

//           // done();
//         });
//       }
//     }

//     routeOptions.preValidation = preValidationHooker;
//   });
// }
