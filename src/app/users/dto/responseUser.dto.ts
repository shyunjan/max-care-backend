import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export default class ResponseUser extends OmitType(UserDto, ['password', 'salt'] as const) {}
