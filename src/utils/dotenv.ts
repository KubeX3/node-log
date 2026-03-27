// dotenv-local.ts
import dotenv from "dotenv";

dotenv.config();

if (process.env.NODE_ENV === "development") {
  dotenv.config({ debug: true });
}

const now = new Date();
console.log(
  "\x1b[32m[%s/%s/%s - %s:%s:%s] \x1b[33m[INFO] - [dotenv-local.ts] - \x1b[37m%s",
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
  String(now.getHours()).padStart(2, "0"),
  String(now.getMinutes()).padStart(2, "0"),
  String(now.getSeconds()).padStart(2, "0"),
  "Dotenv inject",
);

export const DOTENV = {
  LOG_ENABLED: process.env.LOG_ENABLED === undefined ? true : process.env.LOG_ENABLED === "true",
  LOG_FILE_PATH: process.env.LOG_FILE_PATH || "./logs/system.log",
};
