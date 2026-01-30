import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  logError,
  logWarning,
  logInfo,
  logAudit,
  logEvent,
} from "../src/index"; // Adjust path
import { LogTypesEnum } from "../src/utils/enums/log-types.enum";

describe("Logger Utility", () => {
  // Mock the Date to ensure consistent timestamps in tests
  const mockDate = new Date("2026-03-27T10:00:00");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const expectedTimestamp = "\x1b[32m[2026/03/27 - 10:00:00]\x1b[0m";

  it("should log an error with the correct format and color", () => {
    logError("Database failed", "AuthService");

    expect(console.log).toHaveBeenCalledWith(
      "%s %s[%s]%s%s - %s",
      expectedTimestamp,
      "\x1b[31m", // RED
      LogTypesEnum.ERROR,
      " - [AuthService]",
      "\x1b[0m", // RESET
      "Database failed",
    );
  });

  it("should log a warning without a location", () => {
    logWarning("Low disk space");

    expect(console.log).toHaveBeenCalledWith(
      "%s %s[%s]%s%s - %s",
      expectedTimestamp,
      "\x1b[33m", // YELLOW
      LogTypesEnum.WARNING,
      "", // No location
      "\x1b[0m",
      "Low disk space",
    );
  });

  it("should log info messages in green", () => {
    logInfo("User logged in");
    expect(console.log).toHaveBeenCalledWith(
      "%s %s[%s]%s%s - %s", // The format string
      expectedTimestamp,
      "\x1b[32m",           // GREEN
      LogTypesEnum.INFO,
      "",                   // The empty location string
      "\x1b[0m",            // RESET
      "User logged in",
    );
  });

  it("should log audit messages in cyan", () => {
    logAudit("File deleted");
    expect(console.log).toHaveBeenCalledWith(
      "%s %s[%s]%s%s - %s",
      expectedTimestamp,
      "\x1b[36m",           // CYAN
      LogTypesEnum.AUDIT,
      "",
      "\x1b[0m",
      "File deleted",
    );
  });

  it("should log event messages in magenta", () => {
    logEvent("Button clicked");
    expect(console.log).toHaveBeenCalledWith(
      "%s %s[%s]%s%s - %s",
      expectedTimestamp,
      "\x1b[35m",           // MAGENTA
      LogTypesEnum.EVENT,
      "",
      "\x1b[0m",
      "Button clicked",
    );
  });
});
