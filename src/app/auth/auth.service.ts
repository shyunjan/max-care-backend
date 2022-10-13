import { Injectable } from '@nestjs/common';
// import { Cache } from 'cache-manager';
import config from 'src/config/configuration';
import { MemberDto, LoginMemberDto, UpdateMemberDto } from './dto';
import { ILoginInfo } from 'src/types';
import { createHash, aesEncrypt } from 'src/app/common/util/cryptoUtil';
import { createJwt, decodeJwt, verifyJwt } from './auth.util';

const { SECRET: ACCESS_TOKEN_SECRET, TTL: ACCESS_TOKEN_TTL } = config.auth.ACCESS_TOKEN;
const { TTL: REFRESH_TOKEN_TTL } = config.auth.REFRESH_TOKEN;

// @Injectable()
// export class AuthService {
let cnt: number = 0;

// constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
// constructor() {}

// async loginCache(loginData: LoginMemberDto): Promise<SessionType | null> {
//   const lastLoginTime: number | undefined = await this.cacheManager.get<number>(loginData.loginId);
//   console.log('lastLoginTime =', lastLoginTime);
//   return this.saveCache(loginData as MemberDto);
// }

export function login(loginData: LoginMemberDto): string {
  // ++this.cnt;
  ++cnt;
  return `This user's data is ${JSON.stringify(loginData)}: \n` + `Login OK! your request count = ${cnt}`;
}

export async function createAccessToken(member: MemberDto, ttl = ACCESS_TOKEN_TTL) {
  // logger.info(`createAccessToken(${member.mbEmail})`);
  const payload = { id: member.loginId, email: member.email, userLevel: member.userLevel };
  const secret = createAccessTokenSecret(member.loginId);
  return createJwt(payload, secret, ttl);
}

function createAccessTokenSecret(loginId: string) {
  console.log('ACCESS_TOKEN_SECRET = ', ACCESS_TOKEN_SECRET);
  return createHash(`${loginId}${ACCESS_TOKEN_SECRET}`);
}

export function verifyAccessToken(accessToken: string): Promise<ILoginInfo> {
  const payload = decodeJwt(accessToken) as ILoginInfo;
  const secret = createAccessTokenSecret(payload.email);
  return verifyJwt(accessToken, secret) as Promise<ILoginInfo>;
}

function createRefreshTokenSecret(member: MemberDto) {
  return createHash(`${member.salt}${member.password}`);
}

export function createRefreshToken(member: MemberDto, ttl = REFRESH_TOKEN_TTL) {
  // logger.info(`createRefreshToken(${member.loginId})`);
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + ttl;
  const secret = createRefreshTokenSecret(member);
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

export function createMember(member: MemberDto): string {
  return `memberDto = ${JSON.stringify(member)}\nCreating the Member is SUCCESS!`;
}

export function getMember(id: number): string {
  return `This user ID is #${id}.`;
}

export function updateMember(id: number, memberDto: UpdateMemberDto): string {
  return `This user ID is #${id}: \n` + `memberDto = ${JSON.stringify(memberDto)}\n` + `Updating the Member is SUCCESS!`;
}
// }
