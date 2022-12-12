import { IsBoolean } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export default class LoginUserDto extends PickType(UserDto, ['loginId', 'password'] as const) {
  @IsBoolean()
  readonly keepLogin?: boolean = false;
}
