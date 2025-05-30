# Portfolio Setup Guide

## Restructuring Summary

The application has been successfully restructured to eliminate the dual database architecture:

### What Changed

- ✅ **Removed Supabase dependency** - No more conflicting database systems
- ✅ **Unified backend** - Everything now uses Express + MySQL
- ✅ **Consistent authentication** - Single JWT-based auth system
- ✅ **Enhanced admin panel** - Full CRUD operations with better UX
- ✅ **Improved error handling** - Better error messages and validation
- ✅ **Added missing endpoints** - PUT, DELETE, and token verification

### Architecture Now

```
Frontend (React + Vite) → Express API → MySQL Database
```

## Quick Setup

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
MYSQLHOST=your-mysql-host
MYSQLUSER=your-mysql-user
MYSQLPASSWORD=your-mysql-password
MYSQLDATABASE=your-mysql-database
MYSQLPORT=3306

# Authentication
JWT_SECRET=your-jwt-secret-key-change-this
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=your-bcrypt-hashed-password

# Server Configuration
PORT=9000
NODE_ENV=development

# Frontend
REACT_APP_BACKEND_URL=http://localhost:9000
```

### 2. Generate Admin Password Hash

Start the server and visit:

```
http://localhost:9000/generate-hash/your-desired-password
```

Copy the hash to your `.env` file as `ADMIN_PASSWORD_HASH`.

### 3. Start Development

Terminal 1 (Frontend):

```bash
npm run dev
```

Terminal 2 (Backend):

```bash
npm run start:prod
```

### 4. Access Admin Panel

- URL: `http://localhost:3000/#admin`
- Keyboard: `Ctrl+Shift+A`
- Login with your configured admin credentials

## Key Improvements

### Admin Panel Features

- ✅ Secure JWT authentication with token storage
- ✅ Add new projects with validation
- ✅ Edit existing projects inline
- ✅ Delete projects with confirmation
- ✅ Real-time project list updates
- ✅ Better error handling and user feedback
- ✅ Responsive design for mobile admin

### API Endpoints

- `POST /api/login` - Admin authentication
- `GET /api/verify-token` - Token validation
- `GET /projects` - Fetch all projects (public)
- `POST /projects` - Create project (protected)
- `PUT /projects/:id` - Update project (protected)
- `DELETE /projects/:id` - Delete project (protected)

### Database

- Auto-creates `projects` table if it doesn't exist
- Proper MySQL connection pooling
- Enhanced error logging and debugging

## Testing Checklist

1. ✅ Frontend loads without Supabase errors
2. ✅ Backend connects to MySQL database
3. ✅ Admin login works with JWT
4. ✅ Projects can be added, edited, and deleted
5. ✅ Public projects page displays correctly
6. ✅ Responsive design works on all devices

## Deployment Notes

### Backend (Railway)

- Set all environment variables in Railway dashboard
- The app will auto-create the projects table on first run

### Frontend (Netlify)

- Build command: `npm run build`
- Publish directory: `build`
- Environment variable: `REACT_APP_BACKEND_URL=your-railway-url`

## Troubleshooting

### Common Issues

1. **"Supabase is not defined" error**
   - ✅ Fixed: Removed all Supabase dependencies

2. **Authentication conflicts**
   - ✅ Fixed: Single JWT-based auth system

3. **Missing CRUD operations**
   - ✅ Fixed: Added PUT and DELETE endpoints

4. **Build process errors**
   - ✅ Fixed: Updated to use Vite instead of CRA patterns

5. **Database connection issues**
   - Check your MySQL credentials in `.env`
   - Verify the database server is accessible

### Development Tips

1. **Admin Access**: Use `Ctrl+Shift+A` for quick admin panel access
2. **API Testing**: Use `/health` endpoint to check backend status
3. **Database**: Check server logs for MySQL connection status
4. **Hot Reload**: Frontend updates instantly, backend requires restart

## Next Steps

The application is now ready for:

- ✅ Development with consistent architecture
- ✅ Production deployment without conflicts
- ✅ Easy maintenance and feature additions
- ✅ Scalable project management

All previous issues related to dual database systems and authentication conflicts have been resolved!
