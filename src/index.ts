import { LogTypesEnum } from "./utils/enums/log-types.enum";

// ANSI color codes
const colors = {
  RED: "\x1b[31m",
  YELLOW: "\x1b[33m",
  GREEN: "\x1b[32m",
  CYAN: "\x1b[36m",
  MAGENTA: "\x1b[35m",
  RESET: "\x1b[0m",
};

function getFormattedDateTime(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${colors.GREEN}[${year}/${month}/${day} - ${hours}:${minutes}:${seconds}]${colors.RESET}`;
}

function logError(message: string, location?: string): void {
  console.log(
    "%s %s[%s]%s%s - %s",
    getFormattedDateTime(), // green timestamp
    colors.RED, // red color start
    LogTypesEnum.ERROR, // log level
    location ? ` - [${location}]` : "", // optional location
    colors.RESET, // reset color
    message, // error message
  );
}

function logWarning(message: string, location?: string): void {
  console.log(
    "%s %s[%s]%s%s - %s",
    getFormattedDateTime(), // green timestamp
    colors.YELLOW, // yellow color start
    LogTypesEnum.WARNING, // log level
    location ? ` - [${location}]` : "", // optional location
    colors.RESET, // reset color
    message, // info message
  );
}

function logInfo(message: string, location?: string): void {
  console.log(
    "%s %s[%s]%s%s - %s",
    getFormattedDateTime(), // green timestamp
    colors.GREEN, // green color start
    LogTypesEnum.INFO, // log level
    location ? ` - [${location}]` : "", // optional location
    colors.RESET, // reset color
    message, // info message
  );
}

function logAudit(message: string, location?: string): void {
  console.log(
    "%s %s[%s]%s%s - %s",
    getFormattedDateTime(), // green timestamp
    colors.CYAN, // cyan color start
    LogTypesEnum.AUDIT, // log level
    location ? ` - [${location}]` : "", // optional location
    colors.RESET, // reset color
    message, // info message
  );
}

function logEvent(message: string, location?: string): void {
  console.log(
    "%s %s[%s]%s%s - %s",
    getFormattedDateTime(), // green timestamp
    colors.MAGENTA, // magenta color start
    LogTypesEnum.EVENT, // log level
    location ? ` - [${location}]` : "", // optional location
    colors.RESET, // reset color
    message, // info message
  );
}

export { logError, logWarning, logInfo, logAudit, logEvent };
