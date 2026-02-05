import path from "path";
import { promises as fs } from "fs";
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
 * Appends the log message to <log file>.log without ANSI colors
 */
async function logFile(
  logWithColor: string,
  logWithoutColor: string,
): Promise<void> {
  const filePath: string = DOTENV.LOG_FILE_PATH;

  try {
    // Ensure the directory exists if the path is nested (e.g., ./logs/system.log)
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });

    await fs.appendFile(filePath, logWithoutColor + "\n");
  } catch (error) {
    console.error("Error handling file operation:", error);
  }
  console.log(logWithColor);
}

// Format date & time
function getFormattedDateTime(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `[${year}-${month}-${day} - ${hours}:${minutes}:${seconds}]`;
}

function logError(message: string, location?: string): void {
  const logWithColor: string = `${colors.GREEN}${getFormattedDateTime()} ${colors.RED}[${LogTypesEnum.ERROR}]${location ? `\t - [${location}]` : ""}${colors.RESET} - ${message}`;
  const logWithoutColor: string = `${getFormattedDateTime()} [${LogTypesEnum.ERROR}]${location ? `\t - [${location}]` : ""} - ${message}`;
  logFile(logWithColor, logWithoutColor);
}

function logWarning(message: string, location?: string): void {
  const logWithColor: string = `${colors.GREEN}${getFormattedDateTime()} ${colors.YELLOW}[${LogTypesEnum.WARNING}]${location ? `\t - [${location}]` : ""}${colors.RESET} - ${message}`;
  const logWithoutColor: string = `${getFormattedDateTime()} [${LogTypesEnum.WARNING}]${location ? `\t - [${location}]` : ""} - ${message}`;
  logFile(logWithColor, logWithoutColor);
}

function logInfo(message: string, location?: string): void {
  const logWithColor: string = `${colors.GREEN}${getFormattedDateTime()} ${colors.GREEN}[${LogTypesEnum.INFO}]${location ? `\t - [${location}]` : ""}${colors.RESET} - ${message}`;
  const logWithoutColor: string = `${getFormattedDateTime()} [${LogTypesEnum.INFO}]${location ? `\t - [${location}]` : ""} - ${message}`;
  logFile(logWithColor, logWithoutColor);
}

function logAudit(message: string, location?: string): void {
  const logWithColor: string = `${colors.GREEN}${getFormattedDateTime()} ${colors.CYAN}[${LogTypesEnum.AUDIT}]${location ? `\t - [${location}]` : ""}${colors.RESET} - ${message}`;
  const logWithoutColor: string = `${getFormattedDateTime()} [${LogTypesEnum.AUDIT}]${location ? `\t - [${location}]` : ""} - ${message}`;
  logFile(logWithColor, logWithoutColor);
}

function logEvent(message: string, location?: string): void {
  const logWithColor: string = `${colors.GREEN}${getFormattedDateTime()} ${colors.MAGENTA}[${LogTypesEnum.EVENT}]${location ? `\t - [${location}]` : ""}${colors.RESET} - ${message}`;
  const logWithoutColor: string = `${getFormattedDateTime()} [${LogTypesEnum.EVENT}]${location ? `\t - [${location}]` : ""} - ${message}`;
  logFile(logWithColor, logWithoutColor);
}

export { logError, logWarning, logInfo, logAudit, logEvent };
