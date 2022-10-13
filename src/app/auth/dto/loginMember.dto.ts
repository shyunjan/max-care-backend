import { MemberDto } from './member.dto';
import { PickType } from '@nestjs/mapped-types';

export class LoginMemberDto extends PickType(MemberDto, ['loginId', 'email', 'password', 'keepLogin'] as const) {
  constructor(readonly loginId: string, readonly password: string) {
    super();
  }
}
