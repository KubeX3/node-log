# 📝 Node-Log 

[![npm version](https://img.shields.io/npm/v/@kubex3/node-log.svg)](https://www.npmjs.com/package/@kubex3/node-log) 
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://img.shields.io/github/actions/workflow/status/KubeX3/node-log/ci.yml?branch=main)](https://github.com/KubeX3/node-log/actions/workflows/publish.yml)
[![CI Status](https://img.shields.io/github/actions/workflow/status/KubeX3/node-log/ci.yml?branch=main)](https://github.com/KubeX3/node-log/actions/workflows/ci.yml)
[![Socket Badge](https://badge.socket.dev/npm/package/@kubex3/node-log/1.3.1)](https://badge.socket.dev/npm/package/@kubex3/node-log/1.3.1)

A high-performance TypeScript logging utility for modern Node.js (ESM) applications. It automatically manages directory creation and generates structured `.log` files with both ANSI-colored console output and clean, plain-text file persistence.

## ✨ Features

* **Dual Output:** Logs beautifully colored messages to the console while saving clean, uncolored text to your log files.
* **Auto-Directory Creation:** Never worry about `ENOENT` errors. If your log folder doesn't exist, the utility creates it for you automatically.
* **Five Log Levels:** Built-in support for `INFO`, `WARNING`, `ERROR`, `AUDIT`, `EVENT` and `DEBUG`.
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

By default, file logging is enabled and logs are saved to ./logs/system.log. <span style="color:red">Note that debug logging and file output are environment-dependent</span> for example, detailed debug traces are typically disabled when `NODE_ENV="production"` to ensure system stability.

Configuration Options

| Variable | Description | Default |
| :--- | :--- | :--- |
| `LOG_ENABLED` | Set to `true` to write logs to a file, or `false` to only show them in the console. | `true` |
| `LOG_FILE_PATH` | The relative or absolute path where the log file should be created. | `./logs/system.log` |
| `NODE_ENV` | Set to `production` to optimize logging and suppress verbose debug output. | `development` |

### Example `.env` Setup
```env
# Enable or disable file logging (true/false)
LOG_ENABLED="true"

# Custom location for your log files
LOG_FILE_PATH="./src/storage/logs/application.log"

# Environment setting (affects log verbosity)
NODE_ENV="production"
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
[2026-03-27 - 14:30:15] [  INFO   ] - Server successfully started on port 3000
[2026-03-27 - 14:30:15] [  EVENT  ] - Daily database backup triggered
[2026-03-27 - 14:30:16] [ WARNING ]  - [SystemMonitor] - High memory usage detected
[2026-03-27 - 14:30:16] [  ERROR  ]    - [CacheService] - Failed to connect to Redis cluster
[2026-03-27 - 14:30:17] [  AUDIT  ]    - [AuthModule] - User password updated successfully
```

### 📄 File Output (system.log)

The exact same logs are safely appended to your `.log` file, stripped of ANSI color codes for clean parsing by tools like Datadog, Splunk, or ElasticSearch.

```log
[2026-03-27 - 14:30:15] [  INFO   ] - Server successfully started on port 3000
[2026-03-27 - 14:30:15] [  EVENT  ] - Daily database backup triggered
[2026-03-27 - 14:30:16] [ WARNING ]  - [SystemMonitor] - High memory usage detected
[2026-03-27 - 14:30:16] [  ERROR  ]    - [CacheService] - Failed to connect to Redis cluster
[2026-03-27 - 14:30:17] [  AUDIT  ]    - [AuthModule] - User password updated successfully
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
| `logDebug()` | ⚪ White | Verbose "behind-the-scenes" data, variable states, and deep troubleshooting. |


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
