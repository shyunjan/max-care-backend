export default {
  COOKIE_SECRET: 'itech/max-care',
  JWT_ENCRYPT_KEY: 'jwt',
  ACCESS_TOKEN: {
    SECRET: 'eb54ce47916cb3c364681b74188344dg',
    TTL: 60 * 1,
  },
  REFRESH_TOKEN: {
    TTL: 3600 * 12,
    TTL_LONG: 60 * 60 * 24 * 365 * 10,
    REMAIN_TIME_TO_RENEW: 3600 * 2,
  },
};
