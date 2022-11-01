// import { ConfigObject } from '@nestjs/config';

export const APP_PHASE_PROPERTY = 'NODE_ENV';
export const APP_PHASE = process.argv[2];
process.env[APP_PHASE_PROPERTY] = APP_PHASE;
// console.info(`process.env.${APP_PHASE_PROPERTY} =`, process.env[APP_PHASE_PROPERTY]);

const auth = require(`./${APP_PHASE}/config.auth`).default;
// const db = require(`./${appPhase}/config.db`).default;
const etc = require(`./${APP_PHASE}/config.etc`).default;

export default { auth: { ...auth }, etc: { ...etc } };
