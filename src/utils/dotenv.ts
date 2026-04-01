/*
Copyright 2026 KubeX3

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import dotenv from "dotenv";

dotenv.config();

if (process.env.NODE_ENV === "development") {
  dotenv.config({ debug: true });
}

const now = new Date();
console.log(
  "\x1b[90m[%s/%s/%s - %s:%s:%s] \x1b[32m[  INFO   ] \x1b[37m- \x1b[90m[dotenv-local.ts] \x1b[37m- \x1b[37m%s",
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
  String(now.getHours()).padStart(2, "0"),
  String(now.getMinutes()).padStart(2, "0"),
  String(now.getSeconds()).padStart(2, "0"),
  "Dotenv inject",
);

export const DOTENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  LOG_ENABLED:
    process.env.LOG_ENABLED === undefined
      ? true
      : process.env.LOG_ENABLED === "true",
  LOG_FILE_PATH: process.env.LOG_FILE_PATH || "./logs/system.log",
};
