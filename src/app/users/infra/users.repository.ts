import { Injectable, Logger } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
import { UserDto } from '../dto';

/* 테스트용 임시 유저 데이터 */
const USER_LIST: UserDto[] = [
  {
    id: 99999,
    loginId: 'tester22',
    password: '12345!@#$%',
    name: 'Tester',
    email: 'tester@baramnamu.com',
    userLevel: 0,
  },
  {
    id: 1001,
    loginId: 'anonymous-a',
    password: 'xsw21qaz',
    name: 'AnonymousA',
    email: 'user-a@naver.com',
    userLevel: 1000,
  },
  {
    id: 9,
    loginId: 'shyunjan',
    password: '^2237@guswo!',
    name: 'Shin HyunJae',
    email: 'shyunjan@naver.com',
    userLevel: 9900,
  },
];

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(this.constructor.name);
  constructor() {
    USER_LIST.forEach(async (u) => {
      u.salt = await genSalt(10);
      u.password = await hash(u.password, u.salt);
    });
  }

  async getUser(id: number): Promise<UserDto | null> {
    return USER_LIST.find((u) => u.id === id) ?? null;
  }

  async getUserByLoginId(loginId: string): Promise<UserDto | null> {
    return USER_LIST.find((u) => u.loginId === loginId) ?? null;
  }
}
