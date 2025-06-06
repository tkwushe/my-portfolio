# PowerShell script to start the development server
Write-Host "Starting Portfolio Development Server..." -ForegroundColor Green

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the development server
Write-Host "Starting Vite development server..." -ForegroundColor Cyan
npm run dev 