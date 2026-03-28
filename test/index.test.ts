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
  logDebug,
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

    mkdirSyncSpy = jest
      .spyOn(fs, "mkdirSync")
      .mockImplementation(() => undefined as any);
    appendFileSyncSpy = jest
      .spyOn(fs, "appendFileSync")
      .mockImplementation(() => undefined as any);
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Formatting and Output Logs", () => {
    it("should correctly log an ERROR", () => {
      logError("Database failed");

      // Fixed Regex: added \\s* inside the brackets to match centering spaces
      const expectedUncolored = expect.stringMatching(
        new RegExp(
          `^${dateRegex.source} \\[\\s*ERROR\\s*\\] - Database failed\\n$`,
        ),
      );

      expect(appendFileSyncSpy).toHaveBeenCalledWith(
        expect.any(String),
        expectedUncolored,
      );
      // Fixed: The terminal log now has spaces inside the brackets too
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("[  ERROR  ]"),
      );
    });

    it("should correctly log a WARNING", () => {
      logWarning("Disk low", "Server");

      const expectedUncolored = expect.stringMatching(
        new RegExp(
          `^${dateRegex.source} \\[\\s*WARNING\\s*\\] - \\[Server\\] - Disk low\\n$`,
        ),
      );

      expect(appendFileSyncSpy).toHaveBeenCalledWith(
        expect.any(String),
        expectedUncolored,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("[ WARNING ]"),
      );
    });

    it("should correctly log an INFO message", () => {
      logInfo("App started");

      const expectedUncolored = expect.stringMatching(
        new RegExp(`^${dateRegex.source} \\[\\s*INFO\\s*\\] - App started\\n$`),
      );

      expect(appendFileSyncSpy).toHaveBeenCalledWith(
        expect.any(String),
        expectedUncolored,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("[  INFO   ]"),
      );
    });

    it("should correctly log an AUDIT message", () => {
      logAudit("User logged in", "Auth");

      const expected = expect.stringMatching(
        new RegExp(
          `^${dateRegex.source} \\[\\s*AUDIT\\s*\\] - \\[Auth\\] - User logged in\\n$`,
        ),
      );

      expect(appendFileSyncSpy).toHaveBeenCalledWith(
        expect.any(String),
        expected,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("[  AUDIT  ]"),
      );
    });

    it("should correctly log an EVENT message", () => {
      logEvent("Backup completed");

      const expected = expect.stringMatching(
        new RegExp(
          `^${dateRegex.source} \\[\\s*EVENT\\s*\\] - Backup completed\\n$`,
        ),
      );

      expect(appendFileSyncSpy).toHaveBeenCalledWith(
        expect.any(String),
        expected,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("[  EVENT  ]"),
      );
    });

    it("should correctly log an DEBUG message", () => {
      logDebug("Before DB start");

      const expected = expect.stringMatching(
        new RegExp(
          `^${dateRegex.source} \\[\\s*DEBUG\\s*\\] - Before DB start\\n$`,
        ),
      );

      expect(appendFileSyncSpy).toHaveBeenCalledWith(
        expect.any(String),
        expected,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("[  DEBUG  ]"),
      );
    });
  });

  describe("File System Error Handling", () => {
    it("should catch and log an error if fs.mkdirSync fails", () => {
      const mockError = new Error("Disk Read Only");
      mkdirSyncSpy.mockImplementationOnce(() => {
        throw mockError;
      });

      logInfo("Test error handling");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error handling file operation:",
        mockError,
      );
      expect(consoleLogSpy).toHaveBeenCalled(); // Should still print to terminal
    });
  });
});
