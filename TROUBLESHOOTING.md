# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. **Module not found: lucide-react**

**Problem**: `Error: Can't resolve 'lucide-react'`

**Solution**: 
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies with legacy peer deps
npm install framer-motion lucide-react@latest --legacy-peer-deps
```

**Alternative Solution**: If lucide-react still doesn't work, uncomment the fallback imports in the components:
- In `App.js`: Uncomment line 5 and comment line 4
- In `Navigation.js`: Uncomment line 5 and comment line 4
- In `Dashboard.js`: Uncomment line 5 and comment line 4
- In `Leaderboard.js`: Uncomment line 5 and comment line 4

### 2. **PowerShell Execution Policy Error**

**Problem**: `npm : File cannot be loaded because running scripts is disabled`

**Solution**:
```powershell
# Run PowerShell as Administrator and execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

### 3. **Port Already in Use**

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Kill the process using the port
npx kill-port 3000 4000

# Or manually find and kill the process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### 4. **Backend Connection Error**

**Problem**: `Failed to load profile data` or `Failed to load leaderboard data`

**Solution**:
1. Make sure backend server is running:
   ```bash
   cd backend
   npm start
   ```
2. Check if backend is running on `http://localhost:4000`
3. Verify the API endpoints are working

### 5. **Dependencies Installation Issues**

**Problem**: `npm ERR! ERESOLVE unable to resolve dependency tree`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps
```

### 6. **React Version Compatibility**

**Problem**: Peer dependency conflicts with React 19

**Solution**:
```bash
# Install with legacy peer deps flag
npm install --legacy-peer-deps

# Or downgrade React to version 18
npm install react@^18.2.0 react-dom@^18.2.0 --legacy-peer-deps
```

### 7. **Build Errors**

**Problem**: Various build errors during `npm start`

**Solution**:
```bash
# Clear all caches
npm cache clean --force
rm -rf node_modules package-lock.json

# Reinstall everything
npm install --legacy-peer-deps

# Start fresh
npm start
```

### 8. **Browser Compatibility**

**Problem**: App doesn't work in certain browsers

**Solution**:
- Use Chrome, Firefox, Safari, or Edge (latest versions)
- Clear browser cache and cookies
- Try incognito/private mode
- Check browser console for errors

### 9. **Missing Images**

**Problem**: Profile images not loading

**Solution**:
1. Check if images exist in `public/images/`
2. Verify image paths in the code
3. The app has fallback placeholders for missing images

### 10. **Animation Issues**

**Problem**: Framer Motion animations not working

**Solution**:
```bash
# Reinstall framer-motion
npm uninstall framer-motion
npm install framer-motion@latest --legacy-peer-deps
```

## 🚀 Quick Fix Commands

### Complete Reset (Nuclear Option)
```bash
# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
npm start

# Backend (in new terminal)
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm start
```

### PowerShell Fix
```powershell
# Run as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

### Port Issues
```bash
# Kill all processes on ports 3000 and 4000
npx kill-port 3000 4000
```

## 📞 Getting Help

1. **Check the console**: Open browser dev tools (F12) and check for errors
2. **Check the terminal**: Look for error messages in the terminal
3. **Verify dependencies**: Make sure all packages are installed
4. **Check ports**: Ensure no other apps are using ports 3000 or 4000
5. **Restart everything**: Close all terminals and restart

## 🎯 Common Error Messages

| Error | Solution |
|-------|----------|
| `Module not found` | Run `npm install --legacy-peer-deps` |
| `EADDRINUSE` | Run `npx kill-port 3000 4000` |
| `Execution policy` | Run PowerShell as Admin and set execution policy |
| `Peer dependency` | Use `--legacy-peer-deps` flag |
| `Build failed` | Clear cache and reinstall dependencies |

---

**Still having issues?** Check the main [README.md](README.md) or [QUICK_START.md](QUICK_START.md) for more detailed instructions. 