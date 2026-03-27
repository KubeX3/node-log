# 📝 Node-Log 

[![npm version](https://img.shields.io/npm/v/@kubex3/node-log.svg)](https://www.npmjs.com/package/@kubex3/node-log) 
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://img.shields.io/github/actions/workflow/status/KubeX3/node-log/ci.yml?branch=main)](https://github.com/KubeX3/node-log/actions/workflows/publish.yml)
[![CI Status](https://img.shields.io/github/actions/workflow/status/KubeX3/node-log/ci.yml?branch=main)](https://github.com/KubeX3/node-log/actions/workflows/ci.yml)

A high-performance TypeScript logging utility for modern Node.js (ESM) applications. It automatically manages directory creation and generates structured `.log` files with both ANSI-colored console output and clean, plain-text file persistence.

## ✨ Features

* **Dual Output:** Logs beautifully colored messages to the console while saving clean, uncolored text to your log files.
* **Auto-Directory Creation:** Never worry about `ENOENT` errors. If your log folder doesn't exist, the utility creates it for you automatically.
* **Five Log Levels:** Built-in support for `INFO`, `WARNING`, `ERROR`, `AUDIT`, and `EVENT`.
* **Contextual Tagging:** Easily attach a `location` or module name to your logs for lightning-fast debugging.
* **Zero-Config Ready:** Works out of the box, or can be easily customized via `.env` variables.
* **Native ESM:** Built specifically for modern `"type": "module"` Node.js environments.

---

## 📦 Installation

Install the package via npm:

```bash
npm i @kubex3/node-log
```

---

## ⚙️ Configuration

By default, logs are saved to `./logs/system.log`. You can easily override this by setting the `LOG_FILE_PATH` environment variable in your `.env` file.

```env
# .env
LOG_FILE_PATH=./src/storage/logs/application.log
```

---

## 🚀 Usage

Import the logging functions into your file. Since this is an ESM package, you can use modern `import` syntax.

```ts
import { 
  logInfo, 
  logWarning, 
  logError, 
  logAudit, 
  logEvent 
} from "node-log";

// 1. Basic Logging
logInfo("Server successfully started on port 3000");
logEvent("Daily database backup triggered");

// 2. Logging with Context/Location (Highly Recommended)
// Adding a second string argument tags the log with a specific module or file name.
logWarning("High memory usage detected", "SystemMonitor");
logError("Failed to connect to Redis cluster", "CacheService");
logAudit("User password updated successfully", "AuthModule");
```

### 💻 Console Output (With ANSI Colors)

```txt
[2026-03-27 - 14:30:15] [INFO] - Server successfully started on port 3000
[2026-03-27 - 14:30:15] [EVENT] - Daily database backup triggered
[2026-03-27 - 14:30:16] [WARNING]  - [SystemMonitor] - High memory usage detected
[2026-03-27 - 14:30:16] [ERROR]    - [CacheService] - Failed to connect to Redis cluster
[2026-03-27 - 14:30:17] [AUDIT]    - [AuthModule] - User password updated successfully
```

### 📄 File Output (system.log)

The exact same logs are safely appended to your `.log` file, stripped of ANSI color codes for clean parsing by tools like Datadog, Splunk, or ElasticSearch.

```log
[2026-03-27 - 14:30:15] [INFO] - Server successfully started on port 3000
[2026-03-27 - 14:30:15] [EVENT] - Daily database backup triggered
[2026-03-27 - 14:30:16] [WARNING]  - [SystemMonitor] - High memory usage detected
[2026-03-27 - 14:30:16] [ERROR]    - [CacheService] - Failed to connect to Redis cluster
[2026-03-27 - 14:30:17] [AUDIT]    - [AuthModule] - User password updated successfully
```

---

## 🛠️ API Reference

All functions share the same signature: `functionName(message: string, location?: string): void`

| Function | Color | Best Used For |
| :--- | :--- | :--- |
| `logInfo()` | 🟢 Green | Standard system operations, startup messages, and expected behaviors. |
| `logWarning()` | 🟡 Yellow | Non-critical issues, deprecations, or approaching limits (e.g., high RAM). |
| `logError()` | 🔴 Red | Fatal exceptions, unhandled rejections, and system failures. |
| `logAudit()` | 🔵 Cyan | Security events, login attempts, configuration changes, and authorization. |
| `logEvent()` | 🟣 Magenta | Business logic milestones, cron job executions, and user-triggered workflows. |

---

## 👨‍💻 Development

Want to contribute to the project?

1. Clone the repository:

    ```sh
    git clone https://github.com/KubeX3/node-log.git
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Run the test suite:

    ```sh
    npm run test
    ```

4. Build the project:

    ```sh
    npm run build
    ```

### 📜 License

Designed and developed by <b>KubeX3</b>.

Licensed under the <b>Apache License 2.0</b>.




