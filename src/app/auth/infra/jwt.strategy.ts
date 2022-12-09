import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { requestContext, RequestContextData } from '@fastify/request-context';
import config from 'src/config/configuration';
import { ILoginUser, UserLevel } from 'src/types';

const { SECRET: ACCESS_TOKEN_SECRET } = config.auth.ACCESS_TOKEN;

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: (req: RequestContextData) => req.cookies['acc'],
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any): Promise<ILoginUser> {
    const loginUser: ILoginUser = payload;
    loginUser.isLoggedIn = true;
    loginUser.isAdmin = loginUser.userLevel >= UserLevel.operator;

    requestContext.set('loginUser', loginUser);
    return loginUser;
  }
}
