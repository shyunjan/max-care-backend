import { Injectable, Logger } from '@nestjs/common';
// import { Cache } from 'cache-manager';
import config from 'src/config/configuration';
import { compare } from 'bcrypt';
import { MemberDto, UpdateMemberDto } from './dto';
import { ILoginUser, TokenSetType } from 'src/types';
import { createHash, aesEncrypt } from 'src/app/common/util/cryptoUtil';
import { createJwt, decodeJwt, verifyJwt } from './auth.util';
import { UsersRepository } from '../users/infra/users.repository';
import { LoginUserDto, UserDto } from '../users/dto';
import { JwtService } from '@nestjs/jwt';
import CustomError from '../common/error/CustomError';
import { RESULT_CODE } from '../../constant';

const { SECRET: ACCESS_TOKEN_SECRET, TTL: ACCESS_TOKEN_TTL } = config.auth.ACCESS_TOKEN;
const { TTL: REFRESH_TOKEN_TTL } = config.auth.REFRESH_TOKEN;

@Injectable()
export class AuthService {
  constructor(
    // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService
  ) {}
  // constructor() {}
  private readonly logger = new Logger(this.constructor.name);

  // async loginCache(loginData: LoginMemberDto): Promise<SessionType | null> {
  //   const lastLoginTime: number | undefined = await this.cacheManager.get<number>(loginData.loginId);
  //   console.log('lastLoginTime =', lastLoginTime);
  //   return this.saveCache(loginData as MemberDto);
  // }

  async login(loginData: LoginUserDto): Promise<TokenSetType> {
    const user: UserDto = await this.validateUser(loginData.loginId, loginData.password);
    if (user) {
      const { password, salt, ...payload } = user;
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else throw new CustomError(RESULT_CODE.AUTH_NEED_LOGIN);
  }

  async validateUser(loginId: string, password: string): Promise<UserDto> {
    const user = await this.userRepository.getUserByLoginId(loginId);
    if (!user) throw new CustomError(RESULT_CODE.AUTH_INVALID_USER_ID);
    if (await compare(password, user.password)) return user;
    else throw new CustomError(RESULT_CODE.AUTH_WRONG_ID_PW);
  }

  createAccessToken(member: MemberDto, ttl = ACCESS_TOKEN_TTL) {
    // logger.info(`createAccessToken(${member.mbEmail})`);
    const payload = { loginId: member.loginId, email: member.email, userLevel: member.userLevel };
    const secret = this.createAccessTokenSecret(member.loginId);
    return createJwt(payload, secret, ttl);
  }

  createAccessTokenSecret(loginId: string) {
    return createHash(`${loginId}${ACCESS_TOKEN_SECRET}`);
  }

  verifyAccessToken(accessToken: string): Promise<ILoginUser> {
    const payload = decodeJwt(accessToken) as ILoginUser;
    const secret = this.createAccessTokenSecret(payload.loginId);
    return verifyJwt(accessToken, secret) as Promise<ILoginUser>;
  }

  createRefreshTokenSecret(member: MemberDto) {
    return createHash(`${member.salt}${member.password}`);
  }

  createRefreshToken(member: MemberDto, ttl = REFRESH_TOKEN_TTL) {
    // logger.info(`createRefreshToken(${member.loginId})`);
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + ttl;
    const secret = this.createRefreshTokenSecret(member);
    const token = Buffer.from(aesEncrypt(String(exp), secret), 'hex')
      .toString('base64')
      .replace(/=+$/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
    return `${token};${member.loginId}`;
  }

  // async saveCache(member: MemberDto): Promise<SessionType | null> {
  //   const loginTime: number = new Date().getTime();
  //   await this.cacheManager.set<number>(member.loginId, loginTime, { ttl: 600 });
  //   return { loginId: member.loginId, loginTime };
  // }

  // async saveArrayCache(members: MemberDto[]): Promise<SessionType[]> {
  //   const results: SessionType[] = [];

  //   for (const m of members) {
  //     const s = await this.saveCache(m);
  //     if (s) results.push(s);
  //   }

  //   return results;
  // }

  createMember(member: MemberDto): string {
    return `memberDto = ${JSON.stringify(member)}\nCreating the Member is SUCCESS!`;
  }

  updateMember(id: number, memberDto: UpdateMemberDto): string {
    return (
      `This user ID is #${id}: \n` +
      `memberDto = ${JSON.stringify(memberDto)}\n` +
      `Updating the Member is SUCCESS!`
    );
  }
}
