import {
  IsDefined,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  Length,
  Allow,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Sex, UserLevel } from 'src/types';

export class UserDto {
  @IsDefined() // skipUndefinedProperties나 skipMissingProperties의 영향을 받지 않도록 한다
  @Length(8)
  readonly loginId!: string;

  @IsDefined()
  @IsNotEmpty()
  readonly password!: string;

  @IsEmail()
  readonly email!: string;

  // @IsOptional()
  @Length(2, 255)
  readonly name?: string;

  /**
   * 0~9: 테스터(tester) 유저,
   * 10~8999: 일반 유저(customer),
   * 9000~9899: 운영자(operator),
   * 9900~10000: 시스템 관리자(administrator)
   **/
  @Min(0)
  @Max(9999)
  userLevel: UserLevel = UserLevel.tester;

  // @IsOptional()
  @IsInt()
  @Min(19400101)
  @Max(99991231)
  readonly birthNo?: number;

  // @IsOptional()
  @IsEnum(Sex)
  readonly sex?: string;

  @Allow() // 적당한 decorator가 없을 때 이걸 사용하면 된다. 아무것도 쓰지 않으면 whitelist에 걸려서 필터링 당하게 된다
  readonly memo?: string;

  @Allow()
  salt?: string;
}
