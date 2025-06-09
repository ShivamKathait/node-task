import { getEnv } from './env';

export const dbConfig = {
  mongoUri: getEnv('MONGO_URI'),
};
