# My Portfolio - Full Stack Web Application

A modern, responsive portfolio website built with React frontend and Express + MySQL backend.

## Architecture Overview

- **Frontend**: React 18 with modern hooks and components
- **Backend**: Express.js with JWT authentication
- **Database**: MySQL with connection pooling
- **Deployment**: Railway (backend) + Netlify (frontend)
- **Build Tool**: Vite for fast development and optimized builds

## Key Features

- 🎨 Modern, responsive design with smooth animations
- 🔐 Admin panel with JWT authentication for project management
- 📱 Mobile-first responsive layout
- 🚀 Fast loading with optimized build process
- 🔧 Full CRUD operations for project management
- 🎯 Clean, maintainable code structure

## Project Structure

```
my-portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── AdminProjects.js   # Admin panel for CRUD operations
│   │   ├── Projects.js        # Public projects display
│   │   ├── Header.js          # Navigation header
│   │   ├── Home.js            # Homepage content
│   │   ├── About.js           # About section
│   │   ├── Contact.js         # Contact form
│   │   └── Footer.js          # Footer with social links
│   ├── images/            # Image assets
│   ├── sass/              # SCSS stylesheets
│   └── App.js             # Main application component
├── server.js              # Express backend server
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

## Technology Stack

### Frontend

- React 18.3.1
- React Icons
- React Transition Group
- CSS3 with Flexbox/Grid
- Font Awesome icons

### Backend

- Express.js 4.21.2
- MySQL2 for database operations
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests

### Development Tools

- Vite 6.0.5 (build tool)
- ESLint for code linting
- Vitest for testing
- Docker support

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
MYSQLHOST=your-mysql-host
MYSQLUSER=your-mysql-user
MYSQLPASSWORD=your-mysql-password
MYSQLDATABASE=your-mysql-database
MYSQLPORT=3306

# Authentication
JWT_SECRET=your-jwt-secret-key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=your-bcrypt-hashed-password

# Server Configuration
PORT=9000
NODE_ENV=production

# Frontend (for development)
REACT_APP_BACKEND_URL=http://localhost:9000
```

## Database Schema

The application automatically creates the required table if it doesn't exist:

```sql
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  github_link VARCHAR(255),
  live_link VARCHAR(255),
  image_url VARCHAR(255),
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Public Endpoints

- `GET /` - API welcome message
- `GET /health` - Health check with database status
- `GET /projects` - Fetch all projects

### Authentication

- `POST /api/login` - Admin login
- `GET /api/verify-token` - Verify JWT token

### Protected Endpoints (require authentication)

- `POST /projects` - Create new project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MySQL database
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see Environment Variables section)

4. Generate admin password hash:

```bash
# Visit http://localhost:9000/generate-hash/your-password in development
# Copy the hash to your .env file as ADMIN_PASSWORD_HASH
```

### Development

Run the development server:

```bash
npm run dev          # Start Vite dev server (frontend)
npm run start:prod   # Start Express server (backend)
```

### Production Build

```bash
npm run build        # Build for production
npm run start:prod   # Start production server
```

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run test` - Run tests
- `npm run start:prod` - Start production server

## Admin Panel Access

The admin panel can be accessed by:

1. **URL**: Navigate to `#admin` in the URL
2. **Keyboard**: Press `Ctrl+Shift+A`
3. **Login**: Use the credentials set in environment variables

## Deployment

### Backend (Railway)

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

### Frontend (Netlify)

1. Build command: `npm run build`
2. Publish directory: `build`
3. Set `REACT_APP_BACKEND_URL` to your Railway backend URL

## Features

### Admin Panel

- ✅ Secure JWT authentication
- ✅ Add new projects with form validation
- ✅ Edit existing projects inline
- ✅ Delete projects with confirmation
- ✅ Real-time project list updates
- ✅ Responsive design for mobile admin

### Public Interface

- ✅ Animated navigation and transitions
- ✅ Responsive grid layout for projects
- ✅ Contact form integration
- ✅ Social media links
- ✅ Keyboard navigation support
- ✅ SEO-friendly structure

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Email: <your.email@example.com>
- GitHub: [yourusername](https://github.com/yourusername)
- LinkedIn: [yourprofile](https://linkedin.com/in/yourprofile)

---

Built with ❤️ using React and Express.js
