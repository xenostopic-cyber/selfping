# Cross-Platform Discord Ping Terminal Script (Might add this)

A lightweight, cross-platform Node.js script that runs directly from your terminal (Windows, macOS, or Linux). It connects directly to the Discord Gateway via WebSockets to listen for the `§ping` command, computes actual API latency, enforces an authorization safety check, and responds using a clean, ANSI-colored "fake embed" formatting block without revealing your external IP.

> ⚠️ **Disclaimer:** This script acts as a self-bot by automating actions on a user account. Running self-bots is a violation of the Discord Terms of Service (ToS). Use this script at your own risk, keep it private, and do not use it to spam. Never share your authorization token with anyone.

---

## 🚀 Features

- **Terminal Driven:** Runs natively in your terminal environment without keeping a browser open.
- **Cross-Platform:** Works seamlessly on Windows, macOS, and Linux out of the box.
- **Security Filter:** Strictly restricted to a designated Discord User ID (`1514324250683641887`). Unauthorized users receive a fallback rejection notice.
- **ANSI Styled Response:** Bypasses Discord's user-embed restriction by utilizing a stylized ANSI escape colored text block.
- **No IP Exposure:** Latency calculation relies purely on relative API response timestamps, ensuring zero infrastructure or IP data leaks.

---

## 🛠️ Prerequisites

Before executing the script, make sure you have the following installed on your machine:

1. **Node.js** (v16.x or higher recommended)
   - Check if installed: `node -v`
   - If not installed, download from the official [Node.js website](https://nodejs.org/).
   - Alternatively, install via terminal package managers:
     - **macOS (Homebrew):** `brew install node`
     - **Linux (Ubuntu/Debian):** `sudo apt update && sudo apt install nodejs npm`

---

## ⚙️ Setup & Installation

Follow these steps sequentially to configure your local setup:

1. **Clone or Create File:** Create a project directory and place your script inside a file named `bot.js`.
2. **Open Terminal:** Navigate to your project directory inside your terminal application:
   ```bash
   cd /path/to/your/project-directory
   ```
3. **Initialize Package:** Create a clean `package.json` manifest:
   ```bash
   npm init -y
   ```
4. **Install Dependencies:** Install the required WebSocket client middleware:
   ```bash
   npm install ws
   ```

---

## 🔧 Configuration

Open your `bot.js` file in a text editor and update the primary variables at the top of the script:

```javascript
// PUT YOUR DISCORD ACCOUNT AUTHENTICATION TOKEN HERE
const YOUR_TOKEN = "YOUR_ACTUAL_TOKEN_HERE"; 

// THE SPECIFIC USER ID ALLOWED TO RUN THE PING COMMAND
const VIP_ID = "1514324250683641887";
```

### 🔑 How to Securely Extract Your Token
1. Open Discord in your web browser and open developer tools (`F12` or `Ctrl+Shift+I`).
2. Navigate to the **Network** tab and filter for `/api`.
3. Click on any active network request (e.g., `@me` or `science`).
4. Look under **Request Headers** for the `Authorization:` value. Copy this full string.

---

## 💻 Execution

Once properly configured, spin up the active background listener using Node.js:

```bash
node bot.js
```

## 📁 File Structure Diagram

```text
├── project-directory/
│   ├── bot.js            # Main execution script
│   ├── package.json      # Dependencies and manifest metadata
│   └── README.md         # Documentation instructions
```
