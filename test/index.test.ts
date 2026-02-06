import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { promises as fs } from "fs";
import {
  logError,
  logWarning,
  logInfo,
  logAudit,
  logEvent,
} from "../src/index";

// Constants for asserting correct ANSI outputs
const colors = {
  RED: "\x1b[31m",
  YELLOW: "\x1b[33m",
  GREEN: "\x1b[32m",
  CYAN: "\x1b[36m",
  MAGENTA: "\x1b[35m",
  RESET: "\x1b[0m",
};

describe("Logger Utility", () => {
  let consoleLogSpy: any;
  let consoleErrorSpy: any;
  let mkdirSpy: any;
  let appendFileSpy: any;

  // Helper to flush asynchronous tasks
  const flushPromises = () => new Promise(process.nextTick);

  beforeEach(() => {
    jest.clearAllMocks();

    mkdirSpy = jest.spyOn(fs, "mkdir").mockResolvedValue(undefined as any);
    appendFileSpy = jest
      .spyOn(fs, "appendFile")
      .mockResolvedValue(undefined as any);
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // REMOVED: jest.useFakeTimers() and jest.setSystemTime()
  });

  afterEach(() => {
    // REMOVED: jest.useRealTimers()

    // Safely restore spies
    if (mkdirSpy) mkdirSpy.mockRestore();
    if (appendFileSpy) appendFileSpy.mockRestore();
    if (consoleLogSpy) consoleLogSpy.mockRestore();
    if (consoleErrorSpy) consoleErrorSpy.mockRestore();
  });

  const dateRegex = /\[\d{4}-\d{2}-\d{2} - \d{2}:\d{2}:\d{2}\]/;

  describe("Formatting and Output Logs", () => {
    it("should correctly log an ERROR without a location", async () => {
      logError("Database connection failed");
      await flushPromises();

      const expectedUncolored = expect.stringMatching(
        new RegExp(
          `^${dateRegex.source} \\[ERROR\\] - Database connection failed\\n$`,
        ),
      );

      // We use expect.any(String) so it works regardless of your local .env paths
      expect(mkdirSpy).toHaveBeenCalledWith(expect.any(String), {
        recursive: true,
      });
      expect(appendFileSpy).toHaveBeenCalledWith(
        expect.any(String),
        expectedUncolored,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${colors.RED}[ERROR]`),
      );
    });

    it("should correctly log a WARNING with a location", async () => {
      logWarning("Disk space low", "SystemMonitor");
      await flushPromises();

      const expectedUncolored = expect.stringMatching(
        new RegExp(
          `^${dateRegex.source} \\[WARNING\\]\\t - \\[SystemMonitor\\] - Disk space low\\n$`,
        ),
      );

      expect(appendFileSpy).toHaveBeenCalledWith(
        expect.any(String),
        expectedUncolored,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${colors.YELLOW}[WARNING]`),
      );
    });

    it("should correctly log an INFO message", async () => {
      logInfo("Server started successfully");
      await flushPromises();

      const expectedUncolored = expect.stringMatching(
        new RegExp(
          `^${dateRegex.source} \\[INFO\\] - Server started successfully\\n$`,
        ),
      );

      expect(appendFileSpy).toHaveBeenCalledWith(
        expect.any(String),
        expectedUncolored,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${colors.GREEN}[INFO]`),
      );
    });

    it("should correctly log an AUDIT message with a location", async () => {
      logAudit("User changed password", "AuthService");
      await flushPromises();

      const expectedUncolored = expect.stringMatching(
        new RegExp(
          `^${dateRegex.source} \\[AUDIT\\]\\t - \\[AuthService\\] - User changed password\\n$`,
        ),
      );

      expect(appendFileSpy).toHaveBeenCalledWith(
        expect.any(String),
        expectedUncolored,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${colors.CYAN}[AUDIT]`),
      );
    });

    it("should correctly log an EVENT message", async () => {
      logEvent("Scheduled task executed");
      await flushPromises();

      const expectedUncolored = expect.stringMatching(
        new RegExp(
          `^${dateRegex.source} \\[EVENT\\] - Scheduled task executed\\n$`,
        ),
      );

      expect(appendFileSpy).toHaveBeenCalledWith(
        expect.any(String),
        expectedUncolored,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${colors.MAGENTA}[EVENT]`),
      );
    });
  });

  describe("File System Error Handling (logFile)", () => {
    it("should catch and log an error if fs.mkdir fails, but still execute console.log", async () => {
      const mockError = new Error("Permission denied");
      mkdirSpy.mockRejectedValueOnce(mockError);

      logInfo("Test message");
      await flushPromises();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error handling file operation:",
        mockError,
      );
      expect(consoleLogSpy).toHaveBeenCalled();
      expect(appendFileSpy).not.toHaveBeenCalled();
    });

    it("should catch and log an error if fs.appendFile fails, but still execute console.log", async () => {
      const mockError = new Error("Disk full");
      appendFileSpy.mockRejectedValueOnce(mockError);

      logInfo("Test message");
      await flushPromises();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error handling file operation:",
        mockError,
      );
      expect(consoleLogSpy).toHaveBeenCalled();
    });
  });
});
