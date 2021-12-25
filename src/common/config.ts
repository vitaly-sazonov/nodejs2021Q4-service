import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  LOG_ERR_LEVEL: process.env.LOG_ERR_LEVEL as string,
  LOG_INFO_LEVEL: process.env.LOG_INFO_LEVEL as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
};
