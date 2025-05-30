# 🔧 ENVIRONMENT CONFIGURATION GUIDE

## ✅ WHAT YOU NEED IN YOUR `.env` FILE:

```env
# 🌐 BACKEND CONFIGURATION
REACT_APP_BACKEND_URL=https://my-portfolio-production-382d.up.railway.app

# 🖥️ LOCAL SERVER SETTINGS
PORT=9000
NODE_ENV=development
NODE_OPTIONS=--openssl-legacy-provider
```

## ✅ WHAT YOU NEED IN YOUR `.env.development` FILE:

```env
# 🌐 BACKEND CONFIGURATION FOR DEVELOPMENT
REACT_APP_BACKEND_URL=https://my-portfolio-production-382d.up.railway.app
```

## ✅ WHAT YOU NEED IN YOUR `.env.local` FILE:

```env
# 🔄 LOCAL OVERRIDES (optional)
# This file is ignored by git and overrides other env files
REACT_APP_BACKEND_URL=https://my-portfolio-production-382d.up.railway.app
```

## ❌ WHAT TO REMOVE (OLD/INCORRECT):

```env
# ❌ REMOVE THESE - NO LONGER NEEDED:
DB_HOST=your-db-host                    # Wrong format
DB_USER=your-db-user                    # Wrong format  
DB_PASSWORD=your-db-password            # Wrong format
DB_NAME=your-db-name                    # Wrong format
REACT_APP_SUPABASE_URL=...              # Removed Supabase
REACT_APP_SUPABASE_ANON_KEY=...         # Removed Supabase

# ❌ THESE ARE ONLY FOR LOCAL MySQL (not Railway):
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=password
MYSQLDATABASE=portfolio
MYSQLPORT=3306
```

## 🎯 KEY POINTS:

1. **✅ YOU'RE USING RAILWAY BACKEND** - No local database needed
2. **✅ REMOVED SUPABASE** - Using unified MySQL system
3. **✅ PORT 9000** - No more conflicts
4. **✅ SIMPLIFIED CONFIG** - Just one backend URL

## 🚀 TO FIX YOUR ISSUES:

1. **Delete your current .env files**
2. **Create new ones with ONLY the content above**
3. **Restart your dev server**

## 📋 QUICK COMMANDS:

```bash
# Remove old files
Remove-Item .env -ErrorAction SilentlyContinue
Remove-Item .env.local -ErrorAction SilentlyContinue

# Create correct .env
echo "REACT_APP_BACKEND_URL=https://my-portfolio-production-382d.up.railway.app" > .env
echo "PORT=9000" >> .env
echo "NODE_ENV=development" >> .env
echo "NODE_OPTIONS=--openssl-legacy-provider" >> .env

# Create .env.development  
echo "REACT_APP_BACKEND_URL=https://my-portfolio-production-382d.up.railway.app" > .env.development

# Start development
npm run dev
``` 