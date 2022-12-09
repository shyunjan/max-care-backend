export enum Sex {
  'M' = 'Male',
  'F' = 'Female',
}

export enum UserLevel {
  tester = 3,
  customer = 7000,
  operator = 9000,
  administrator = 9900,
}

/**
 * 0~9: 테스터(tester) 유저,
 * 10~8999: 일반 고객 유저(customer),
 * 9000~9899: 운영자(operator),
 * 9900~9999: 시스템 관리자(administrator)
 **/
export interface ILoginUser {
  loginId: string;
  email: string;
  userLevel: UserLevel;
  isLoggedIn?: boolean;
  isAdmin?: boolean;
}

export interface TokenSetType {
  accessToken: string;
}
