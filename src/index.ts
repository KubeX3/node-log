import path from "path";
import fs from "fs"; // Standard fs, not promises
import { DOTENV } from "./utils/dotenv";
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

/**
 * Appends the log message to file synchronously
 */
function logFile(
  logWithColor: string,
  logWithoutColor: string,
): void {
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

// All log functions become regular functions (no async)
function logError(message: string, location?: string): void {
  const logWithColor = `${colors.GREEN}${getFormattedDateTime()} ${colors.RED}[${LogTypesEnum.ERROR}]${location ? `\t - [${location}]` : ""}${colors.RESET} - ${message}`;
  const logWithoutColor = `${getFormattedDateTime()} [${LogTypesEnum.ERROR}]${location ? `\t - [${location}]` : ""} - ${message}`;
  logFile(logWithColor, logWithoutColor);
}

function logWarning(message: string, location?: string): void {
  const logWithColor = `${colors.GREEN}${getFormattedDateTime()} ${colors.YELLOW}[${LogTypesEnum.WARNING}]${location ? `\t - [${location}]` : ""}${colors.RESET} - ${message}`;
  const logWithoutColor = `${getFormattedDateTime()} [${LogTypesEnum.WARNING}]${location ? `\t - [${location}]` : ""} - ${message}`;
  logFile(logWithColor, logWithoutColor);
}

function logInfo(message: string, location?: string): void {
  const logWithColor = `${colors.GREEN}${getFormattedDateTime()} ${colors.GREEN}[${LogTypesEnum.INFO}]${location ? `\t - [${location}]` : ""}${colors.RESET} - ${message}`;
  const logWithoutColor = `${getFormattedDateTime()} [${LogTypesEnum.INFO}]${location ? `\t - [${location}]` : ""} - ${message}`;
  logFile(logWithColor, logWithoutColor);
}

function logAudit(message: string, location?: string): void {
  const logWithColor = `${colors.GREEN}${getFormattedDateTime()} ${colors.CYAN}[${LogTypesEnum.AUDIT}]${location ? `\t - [${location}]` : ""}${colors.RESET} - ${message}`;
  const logWithoutColor = `${getFormattedDateTime()} [${LogTypesEnum.AUDIT}]${location ? `\t - [${location}]` : ""} - ${message}`;
  logFile(logWithColor, logWithoutColor);
}

function logEvent(message: string, location?: string): void {
  const logWithColor = `${colors.GREEN}${getFormattedDateTime()} ${colors.MAGENTA}[${LogTypesEnum.EVENT}]${location ? `\t - [${location}]` : ""}${colors.RESET} - ${message}`;
  const logWithoutColor = `${getFormattedDateTime()} [${LogTypesEnum.EVENT}]${location ? `\t - [${location}]` : ""} - ${message}`;
  logFile(logWithColor, logWithoutColor);
}

export { logError, logWarning, logInfo, logAudit, logEvent };