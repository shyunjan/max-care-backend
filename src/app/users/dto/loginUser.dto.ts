import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export default class LoginUserDto extends PickType(UserDto, [
  'loginId',
  'password',
  'keepLogin',
] as const) {}
