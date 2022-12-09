import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from '../dto';

const USER_LIST: UserDto[] = [
  { loginId: 'tester22', password: '12345!@#$%', email: 'tester@baramnamu.com', userLevel: 0 },
  { loginId: 'anonymous-a', password: 'xsw21qaz', email: 'user-a@naver.com', userLevel: 1000 },
  { loginId: 'shyunjan', password: '^2237@guswo!', email: 'shyunjan@naver.com', userLevel: 9900 },
];

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(this.constructor.name);

  async getUser(id: string): Promise<UserDto | null> {
    return USER_LIST.find((u) => u.loginId === id) ?? null;
  }
}
