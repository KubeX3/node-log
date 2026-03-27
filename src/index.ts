import path from "path";
import fs from "fs"; // Standard fs, not promises
import { DOTENV } from "./utils/dotenv";
import { LogTypesEnum } from "./utils/enums/log-types.enum";

// ANSI color codes
const colors = {
  RESET: "\x1b[0m",
  RED: "\x1b[31m",
  YELLOW: "\x1b[33m",
  GREEN: "\x1b[32m",
  CYAN: "\x1b[36m",
  MAGENTA: "\x1b[35m",
  GRAY: "\x1b[90m",
};

/**
 * Appends the log message to file synchronously
 */
function logFile(logWithColor: string, logWithoutColor: string): void {
  const logEnabled: boolean = DOTENV.LOG_ENABLED;

  if (logEnabled) {
    const filePath: string = DOTENV.LOG_FILE_PATH;

    try {
      const dir = path.dirname(filePath);
      // Synchronous directory creation
      fs.mkdirSync(dir, { recursive: true });
      // Synchronous file append
      fs.appendFileSync(filePath, logWithoutColor + "\n");
    } catch (error) {
      console.error("Error handling file operation:", error);
    }
  }
  console.log(logWithColor);
}

// Format date & time (stays the same)
function getFormattedDateTime(): string {
  const now = new Date();
  return `[${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} - ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}]`;
}

/**
 * Centers text inside brackets to a fixed width of 9 characters.
 * Example: "INFO"    -> "[  INFO   ]"
 * Example: "WARNING" -> "[ WARNING ]"
 */
function getPaddedType(type: string): string {
  const width = 9; // Total width inside the brackets
  const len = type.length;
  const leftPadding = Math.floor((width - len) / 2);
  const rightPadding = width - len - leftPadding;

  return `[${" ".repeat(leftPadding)}${type}${" ".repeat(rightPadding)}]`;
}

// All log functions become regular functions
function logError(message: string, location?: string): void {
  const type = getPaddedType(LogTypesEnum.ERROR);
  const time = getFormattedDateTime();

  const logWithColor = `${colors.GRAY}${time}${colors.RESET} ${colors.RED}${type}${colors.RESET}${location ? ` - ${colors.GRAY}[${location}]${colors.RESET}` : ""} - ${message}`;
  const logWithoutColor = `${time} ${type}${location ? ` - [${location}]` : ""} - ${message}`;

  logFile(logWithColor, logWithoutColor);
}

function logWarning(message: string, location?: string): void {
  const type = getPaddedType(LogTypesEnum.WARNING);
  const time = getFormattedDateTime();

  const logWithColor = `${colors.GRAY}${time}${colors.RESET} ${colors.YELLOW}${type}${colors.RESET}${location ? ` - ${colors.GRAY}[${location}]${colors.RESET}` : ""} - ${message}`;
  const logWithoutColor = `${time} ${type}${location ? ` - [${location}]` : ""} - ${message}`;

  logFile(logWithColor, logWithoutColor);
}

function logInfo(message: string, location?: string): void {
  const type = getPaddedType(LogTypesEnum.INFO);
  const time = getFormattedDateTime();

  const logWithColor = `${colors.GRAY}${time}${colors.RESET} ${colors.GREEN}${type}${colors.RESET}${location ? ` - ${colors.GRAY}[${location}]${colors.RESET}` : ""} - ${message}`;
  const logWithoutColor = `${time} ${type}${location ? ` - [${location}]` : ""} - ${message}`;

  logFile(logWithColor, logWithoutColor);
}

function logAudit(message: string, location?: string): void {
  const type = getPaddedType(LogTypesEnum.AUDIT);
  const time = getFormattedDateTime();

  const logWithColor = `${colors.GRAY}${time}${colors.RESET} ${colors.CYAN}${type}${colors.RESET}${location ? ` - ${colors.GRAY}[${location}]${colors.RESET}` : ""} - ${message}`;
  const logWithoutColor = `${time} ${type}${location ? ` - [${location}]` : ""} - ${message}`;

  logFile(logWithColor, logWithoutColor);
}

function logEvent(message: string, location?: string): void {
  const type = getPaddedType(LogTypesEnum.EVENT);
  const time = getFormattedDateTime();

  const logWithColor = `${colors.GRAY}${time}${colors.RESET} ${colors.MAGENTA}${type}${colors.RESET}${location ? ` - ${colors.GRAY}[${location}]${colors.RESET}` : ""} - ${message}`;
  const logWithoutColor = `${time} ${type}${location ? ` - [${location}]` : ""} - ${message}`;

  logFile(logWithColor, logWithoutColor);
}

export { logError, logWarning, logInfo, logAudit, logEvent };
