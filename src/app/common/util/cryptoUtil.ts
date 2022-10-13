import crypto from 'crypto';

/**
 * AES Encrypt
 * @param text
 * @param key
 */
export function aesEncrypt(text: string, key: string) {
  const IV_LENGTH = 16;
  const keyBuffer = Buffer.alloc(32).fill(key, 0, Math.min(32, key.length));
  const ivBuffer = Buffer.from(createRandomHash(IV_LENGTH * 2), 'hex');
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, ivBuffer);

  let result = ivBuffer.toString('hex');
  result += cipher.update(text, 'utf8', 'hex');
  result += cipher.final('hex');

  return result;
}

/**
 * AES Decrypt
 * @param encryptedText
 * @param key
 */
export function aesDecrypt(encryptedText: string, key: string) {
  const keyBuffer = Buffer.alloc(32).fill(key, 0, Math.min(32, key.length));
  const ivBuffer = Buffer.from(encryptedText.slice(0, 32), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);

  let result = decipher.update(encryptedText.slice(32), 'hex', 'utf8');
  result += decipher.final('utf8');
  return result;
}

/**
 * Create hash
 * @param value
 * @param algorithm
 */
export function createHash(value: string, algorithm = 'sha256') {
  const h = crypto.createHash(algorithm);
  h.update(value);
  return h.digest('hex');
}

/**
 * Create random hash (Using Math.random())
 * @param length
 * @param [possible]
 */
export function createRandomHash(length = 32, possible = 'abcdef0123456789') {
  const result = [],
    possibleLength = possible.length;

  for (let i = 0; i < length; i++) {
    result.push(possible.charAt(Math.floor(Math.random() * possibleLength)));
  }

  return result.join('');
}

export function encryptHmac(secret: string, value: string, algorithm = 'sha256') {
  const hmac = crypto.createHmac(algorithm, secret);
  hmac.update(value);
  return hmac.digest('base64');
}
