import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import fs from "fs";

// MOCK THE CONFIG: This ensures the 'if (logEnabled)' check always passes in tests
jest.mock("../src/utils/dotenv", () => ({
  DOTENV: {
    LOG_FILE: true,
    LOG_FILE_PATH: "./logs/test.log",
  },
}));

import {
  logError,
  logWarning,
  logInfo,
  logAudit,
  logEvent,
} from "../src/index";

const colors = {
  RED: "\x1b[31m",
  YELLOW: "\x1b[33m",
  GREEN: "\x1b[32m",
  CYAN: "\x1b[36m",
  MAGENTA: "\x1b[35m",
  RESET: "\x1b[0m",
};

describe("Logger Utility (Synchronous)", () => {
  let consoleLogSpy: any;
  let consoleErrorSpy: any;
  let mkdirSyncSpy: any;
  let appendFileSyncSpy: any;

  const dateRegex = /\[\d{4}-\d{2}-\d{2} - \d{2}:\d{2}:\d{2}\]/;

  beforeEach(() => {
    jest.clearAllMocks();

    mkdirSyncSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => undefined as any);
    appendFileSyncSpy = jest.spyOn(fs, "appendFileSync").mockImplementation(() => undefined as any);
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Formatting and Output Logs", () => {
    it("should correctly log an ERROR", () => {
      logError("Database failed");
      expect(appendFileSyncSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringMatching(new RegExp(`^${dateRegex.source} \\[ERROR\\] - Database failed\\n$`))
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(`${colors.RED}[ERROR]`));
    });

    it("should correctly log a WARNING", () => {
      logWarning("Disk low", "Server");
      expect(appendFileSyncSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringMatching(new RegExp(`^${dateRegex.source} \\[WARNING\\]\\t - \\[Server\\] - Disk low\\n$`))
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(`${colors.YELLOW}[WARNING]`));
    });

    it("should correctly log an INFO message", () => {
      logInfo("App started");
      expect(appendFileSyncSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringMatching(new RegExp(`^${dateRegex.source} \\[INFO\\] - App started\\n$`))
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(`${colors.GREEN}[INFO]`));
    });

    it("should correctly log an AUDIT message", () => {
      logAudit("User logged in", "Auth");
      const expected = expect.stringMatching(
        new RegExp(`^${dateRegex.source} \\[AUDIT\\]\\t - \\[Auth\\] - User logged in\\n$`)
      );
      expect(appendFileSyncSpy).toHaveBeenCalledWith(expect.any(String), expected);
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(`${colors.CYAN}[AUDIT]`));
    });

    it("should correctly log an EVENT message", () => {
      logEvent("Backup completed");
      const expected = expect.stringMatching(
        new RegExp(`^${dateRegex.source} \\[EVENT\\] - Backup completed\\n$`)
      );
      expect(appendFileSyncSpy).toHaveBeenCalledWith(expect.any(String), expected);
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(`${colors.MAGENTA}[EVENT]`));
    });
  });

  describe("File System Error Handling", () => {
    it("should catch and log an error if fs.mkdirSync fails", () => {
      const mockError = new Error("Disk Read Only");
      mkdirSyncSpy.mockImplementationOnce(() => { throw mockError; });

      logInfo("Test error handling");

      expect(consoleErrorSpy).toHaveBeenCalledWith("Error handling file operation:", mockError);
      expect(consoleLogSpy).toHaveBeenCalled(); // Should still print to terminal
    });
  });
});