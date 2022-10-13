import { FastifyInstance, RouteOptions, preValidationHookHandler } from 'fastify';
import { verifyAccessToken } from '../auth/auth.service';

const checkAdminAuthUrl: string[] = [
  // 어드민 권한이 필요한 API Url List
  '/auth/get-users',
];
const checkLoginAuthUrl: string[] = [
  // 어드민 권한까지는 필요없지만 로그인이 필요한 API Url List
  '/auth/get',
].concat(checkAdminAuthUrl);

export default function addFastifyHook(server: FastifyInstance): FastifyInstance {
  return server.addHook('onRoute', (routeOptions: RouteOptions) => {
    const url = routeOptions.url;
    let preValidationHooker: preValidationHookHandler[] = [];

    if (checkLoginAuthUrl.some((u) => url.includes(u))) {
      preValidationHooker.push(async (request, reply, done) => {
        console.log('Hooking preValidation for Login Authorization...');
        const accessToken = request.cookies['acc'];
        if (accessToken) {
          const loginInfo = await verifyAccessToken(request.cookies['acc']);
          console.log(loginInfo);

          // ctx.state.loginInfo = loginInfo;
          // ctx.state.isLoggedIn = true;
          // ctx.state.isAdmin = loginInfo.mbType === MEMBER.TYPE.ADMIN;
        } else throw new Error('No access token');

        done();
      });
      if (checkAdminAuthUrl.some((u) => url.includes(u))) {
        preValidationHooker.push(async (request, reply, done) => {
          console.log('Hooking preValidation for Admin Authorization...');
          done();
        });
      }
    }

    routeOptions.preValidation = preValidationHooker;
  });
}
