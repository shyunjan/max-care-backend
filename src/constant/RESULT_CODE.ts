const RESULT_CODE = (<T extends { [key: string]: number }>(arg: T): T => arg)({
  OK: 0, // 정상

  /* AUTH 관련 에러 - 102XX */
  AUTH_NEED_LOGIN: 10201,
  AUTH_NEED_ADMIN: 10202,

  UNKNOWN_ERROR: 99999, // 알 수 없는 오류
});

export default RESULT_CODE;
