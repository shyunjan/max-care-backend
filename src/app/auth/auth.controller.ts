import {
  Controller,
  HttpStatus,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Res,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  ParseArrayPipe,
} from '@nestjs/common';
import config from 'src/config/configuration';
import { FastifyReply } from 'fastify';
// import { AuthService } from './auth.service';
import { login, createRefreshToken, createAccessToken, createMember, getMember, updateMember } from './auth.service';
import { MemberDto, LoginMemberDto, UpdateMemberDto } from './dto';
import { SessionType } from 'src/types';

const JWT_ENCRYPT_KEY = config.auth.JWT_ENCRYPT_KEY;
const { TTL: ACCESS_TOKEN_TTL } = config.auth.ACCESS_TOKEN;
const {
  TTL: REFRESH_TOKEN_TTL,
  TTL_LONG: REFRESH_TOKEN_TTL_LONG,
  REMAIN_TIME_TO_RENEW: REFRESH_TOKEN_RENEW_TIME,
} = config.auth.REFRESH_TOKEN;

@Controller('auth')
export class AuthController {
  // constructor(private readonly authService: AuthService) {}
  constructor() {}

  @Get('login')
  async loginTester(@Query('loginId') loginId: string): Promise<SessionType | string> {
    const loginData = new LoginMemberDto(loginId, '^123456@password!');
    // const result = await this.authService.loginCache(loginData);
    // return JSON.stringify(loginData) ?? 'Exception';
    return login(loginData);
  }

  @Post('login')
  async login(@Res({ passthrough: true }) res: FastifyReply, @Body() loginData: LoginMemberDto): Promise<SessionType | string> {
    const loginId = loginData.loginId;
    const pw = loginData.password;
    const keepLogin = !!loginData.keepLogin;
    // console.log('loginId =', loginId, '; pw =', pw, '; keepLogin =', keepLogin);

    // const member = (await Member.findOne({ where: { loginId } }))?.get({ plain: true });
    // if (!member || !verifyPw(member, pw)) return new CustomError(RESULT_CODE.AUTH_WRONG_ID_PW);
    /* 바로 위의 DB fetch 코드가 완성되면 아래 라인은 제거하자. */
    const member: MemberDto = { ...loginData, userLevel: 9, salt: 'abcdefg1234567890' };

    // if (member.mbStatus === MEMBER.STATUS.NOT_APPROVED) return new CustomError(RESULT_CODE.AUTH_UNAPPROVED_ACCOUNT);
    // else if (member.mbStatus === MEMBER.STATUS.SUSPENDED) return new CustomError(RESULT_CODE.AUTH_SUSPENDED_ACCOUNT);
    // else if (member.mbStatus === MEMBER.STATUS.WITHDRAWN) return new CustomError(RESULT_CODE.AUTH_WITHDRAWN_ACCOUNT);

    const refreshToken = createRefreshToken(member, keepLogin ? REFRESH_TOKEN_TTL_LONG : REFRESH_TOKEN_TTL);

    let accessToken = (await createAccessToken(member, ACCESS_TOKEN_TTL)) ?? '';
    console.log('accessToken =', accessToken);
    res.setCookie('acc', accessToken, { sameSite: 'none', expires: new Date(Date.now() + ACCESS_TOKEN_TTL * 1000) });
    /* 나중에 멤버 타입에 따라서 expire time을 별도로 설정하는 로직 추가 예정 */

    /* Refresh Token도 Cookie에 저장하는 방식으로 수정 검토 */
    return refreshToken;
  }

  @Post('create')
  create(@Res({ passthrough: true }) res: FastifyReply, @Body() memberDto: MemberDto): string {
    res.code(HttpStatus.CREATED);
    // res.header(key: string, value: any);
    return createMember(memberDto);
  }

  @Get('get')
  // getUser(@Query() params: getUserParams): string {
  getUser(
    @Query('id', new DefaultValuePipe(1), new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }))
    id: number
  ): string {
    return getMember(+id);
  }

  @Get('get-users')
  getUsers(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]): string[] {
    return ids.map((n) => n.toString());
  }

  @Patch('update/:id')
  update(
    // @Param('id') id: number,
    /* 최초 Validation 설정시(main.ts 참조)에 new ValidationPipe({ transform: true })로 옵션을 설정하고 
       위 라인의 코드를 사용하면 별도로 아래처럼 Pipe를 설치하지 않아도 number로 자동으로 변환된다. 
       단, validation exception 처리는 해주지 않는다.
     */
    @Param('id', ParseIntPipe) id: number,
    @Body() memberDto: UpdateMemberDto
  ) {
    // console.log("typeof id === 'number' =", typeof id === 'number');
    return updateMember(id, memberDto);
  }
}
