import dotenv from 'dotenv';

dotenv.config();

if (process.env.ENV === 'DEV') {
  const now = new Date();
  dotenv.config({ debug: true });
  console.log(
    '\x1b[32m[%s/%s/%s - %s:%s:%s] \x1b[33m[INFO] - [utils/dotenv.ts] - \x1b[37m%s',
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
    'Dotenv inject',
  );
}

export const DOTENV = {
  ENV: process.env.ENV || 'PROD',
};