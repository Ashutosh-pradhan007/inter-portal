# 🚀 Quick Start Guide

Get your Intern Portal running in minutes!

## ⚡ Quick Setup

### Option 1: Automated Setup (Recommended)
```powershell
# Run the setup script
.\setup.ps1
```

### Option 2: Manual Setup

1. **Fix PowerShell Execution Policy**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

## 🎯 Start the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Backend will run on `http://localhost:4000`

2. **Start Frontend Server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

3. **Open Browser**
   Navigate to `http://localhost:3000`

## 🎨 What's New

### ✨ Enhanced UI Features
- **Modern Login Screen**: Animated background with smooth transitions
- **Beautiful Dashboard**: Gradient cards, hover effects, and loading states
- **Interactive Leaderboard**: Special badges for top performers
- **Responsive Navigation**: Sticky header with active states

### 🚀 UX Improvements
- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Professional spinners and skeleton screens
- **Error Handling**: User-friendly error messages
- **Mobile Optimized**: Touch-friendly interactions

### 🎯 Key Components
- **Login**: Modern authentication with validation
- **Dashboard**: Stats overview, achievements, and quick actions
- **Leaderboard**: Competition view with rankings and statistics
- **Navigation**: Seamless page transitions

## 🔧 Troubleshooting

### PowerShell Issues
```powershell
# If npm commands fail, run as Administrator:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

### Port Issues
- Frontend: Change port in `frontend/package.json`
- Backend: Change port in `backend/index.js`

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#faf5ff',
    // Add your custom colors
  }
}
```

### Animations
Add custom animations in `tailwind.config.js`:
```javascript
animation: {
  'custom': 'custom 2s ease-in-out infinite',
}
```

## 🆘 Need Help?

1. Check the main [README.md](README.md) for detailed documentation
2. Ensure both backend and frontend servers are running
3. Check browser console for any errors
4. Verify all dependencies are installed correctly

---

**Happy coding! 🎉** 