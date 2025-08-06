# Intern Portal Setup Script
# This script helps set up the project and fix common issues

Write-Host "🚀 Intern Portal Setup Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Host "⚠️  Warning: This script is not running as Administrator" -ForegroundColor Yellow
    Write-Host "Some features may not work properly. Consider running as Administrator." -ForegroundColor Yellow
    Write-Host ""
}

# Check current execution policy
Write-Host "📋 Checking PowerShell execution policy..." -ForegroundColor Blue
$currentPolicy = Get-ExecutionPolicy
Write-Host "Current execution policy: $currentPolicy" -ForegroundColor Cyan

if ($currentPolicy -eq "Restricted") {
    Write-Host "🔧 Fixing execution policy..." -ForegroundColor Yellow
    try {
        Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
        Write-Host "✅ Execution policy updated successfully!" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to update execution policy. Please run as Administrator." -ForegroundColor Red
        Write-Host "You can manually run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Yellow
    }
}
else {
    Write-Host "✅ Execution policy is already set correctly" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ npm not found. Please install Node.js which includes npm." -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host ""
Write-Host "📁 Installing frontend dependencies..." -ForegroundColor Blue
Set-Location "frontend"
try {
    npm install
    Write-Host "✅ Frontend dependencies installed successfully!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Install backend dependencies
Write-Host ""
Write-Host "📁 Installing backend dependencies..." -ForegroundColor Blue
Set-Location "../backend"
try {
    npm install
    Write-Host "✅ Backend dependencies installed successfully!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Return to root directory
Set-Location ".."

Write-Host ""
Write-Host "🎉 Setup completed!" -ForegroundColor Green
Write-Host "==================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Blue
Write-Host "1. Start the backend server: cd backend && npm start" -ForegroundColor White
Write-Host "2. Start the frontend server: cd frontend && npm start" -ForegroundColor White
Write-Host "3. Open your browser to http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Happy coding!" -ForegroundColor Green 