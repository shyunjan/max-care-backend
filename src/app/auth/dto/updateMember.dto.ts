import { MemberDto } from './member.dto';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Length } from 'class-validator';

export class UpdateMemberDto extends PartialType(OmitType(MemberDto, ['name'] as const)) {
  @Length(2, 255)
  readonly name?: string;
}
