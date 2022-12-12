import { PartialType, OmitType, PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class UpdateUserPartial extends PartialType(OmitType(UserDto, ['id'] as const)) {}
export class UpdateUserRequired extends PickType(UserDto, ['id'] as const) {}

// export type UpdateUserDto = UpdateUserPartial & UpdateUserRequired;
export default interface UpdateUserDto extends UpdateUserPartial, UpdateUserRequired {}
