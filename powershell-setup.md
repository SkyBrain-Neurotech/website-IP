# PowerShell Setup Instructions

## The Problem
Your Node.js/npm is installed in WSL Ubuntu, not Windows, so PowerShell can't find the `vite` command.

## Solution Options

### Option 1: Install Node.js on Windows (Recommended)
1. Download Node.js from https://nodejs.org/ (LTS version)
2. Install it on Windows (not WSL)
3. Open new PowerShell window
4. Navigate to project directory
5. Run `npm install` to install dependencies for Windows
6. Run `npm run dev`

### Option 2: Use your existing .bat files
Instead of `npm run dev`, use:
```
.\dev.bat
```

### Option 3: Add WSL npm to Windows PATH
Add this to your PowerShell profile to create npm alias:
```powershell
function npm { wsl npm $args }
function node { wsl node $args }
function npx { wsl npx $args }
```

## Current Working Commands
- `.\dev.bat` - Works now
- `.\build.bat` - Works now