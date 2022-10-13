import jwt, { VerifyOptions } from 'jsonwebtoken';

/**
 * Create JWT
 * @param payload
 * @param secret
 * @param ttl
 */
export async function createJwt(payload: any, secret: string, ttl: number): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + ttl;
    const payload2 = { ...payload, iat, exp };

    jwt.sign(payload2, secret, (error: any, token: string | undefined) => {
      if (error) reject(error);
      else resolve(token);
    });
  });
}

/**
 * Verify and decode JWT
 * @param token
 * @param secret
 * @param option
 */
export async function verifyJwt(token: string, secret: string, option?: VerifyOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, option, (error, decoded) => {
      if (error) reject(error);
      else resolve(decoded);
    });
  });
}

/**
 * Just decode JWT
 * returns null if invalid token provided
 * @param token
 */
export function decodeJwt(token: string) {
  return jwt.decode(token);
}
