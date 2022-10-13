export enum Sex {
  'M' = 'Male',
  'F' = 'Female',
}

/**
 * 0~9: 테스터(tester) 유저,
 * 10~8999: 일반 유저(customer),
 * 9000~9899: 운영자(operator),
 * 9900~10000: 시스템 관리자(administrator)
 **/
export interface ILoginInfo {
  loginId: string;
  email: string;
  userLevel: number;
}
