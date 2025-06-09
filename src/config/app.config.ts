import { getEnv } from './env';

export const appConfig = {
  port: parseInt(getEnv('PORT', '3000')),
  JWT_ACCESS_SECRET : getEnv('JWT_ACCESS_SECRET'),
  JWT_ACCESS_EXPIRY : getEnv('JWT_ACCESS_EXPIRY'),
  saltRounds: getEnv('saltRounds')
};
