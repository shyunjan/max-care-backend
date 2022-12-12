import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from '../dto';

const USER_LIST: UserDto[] = [
  {
    id: 99999,
    loginId: 'tester22',
    password: '12345!@#$%',
    email: 'tester@baramnamu.com',
    userLevel: 0,
  },
  {
    id: 1001,
    loginId: 'anonymous-a',
    password: 'xsw21qaz',
    email: 'user-a@naver.com',
    userLevel: 1000,
  },
  {
    id: 9,
    loginId: 'shyunjan',
    password: '^2237@guswo!',
    email: 'shyunjan@naver.com',
    userLevel: 9900,
  },
];

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(this.constructor.name);

  async getUser(id: number): Promise<UserDto | null> {
    return USER_LIST.find((u) => u.id === id) ?? null;
  }

  async getUserByLoginId(loginId: string): Promise<UserDto | null> {
    return USER_LIST.find((u) => u.loginId === loginId) ?? null;
  }
}
