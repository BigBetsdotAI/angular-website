# 🚀 Start Both Frontend & Backend Guide

## ✅ Setup Complete!

Your project is now configured to start both frontend (Angular) and backend (Node.js) together.

---

## 🎯 Quick Start Commands

### Start Everything (Frontend + Backend):
```bash
npm start
```

This will start:
- ✅ **Backend** on http://localhost:3001
- ✅ **Frontend** on http://localhost:4200

### Start Individually:

**Frontend only:**
```bash
npm run start:frontend-only
```

**Backend only:**
```bash
npm run start:backend-only
```

---

## 📋 Available Scripts

| Command | What it does |
|---------|-------------|
| `npm start` | 🚀 Starts both frontend and backend together |
| `npm run start:frontend-only` | Starts only Angular dev server |
| `npm run start:backend-only` | Starts only Node.js backend |
| `npm run build` | Builds Angular for production |
| `npm test` | Runs Angular tests |

---

## 🎨 What You'll See

When you run `npm start`, you'll see colorful output:

```
[BACKEND] 🔧 Initializing email transporter...
[BACKEND] 🚀 Backend server running on port 3001
[FRONTEND] ** Angular Live Development Server is listening on localhost:4200
[FRONTEND] ✔ Compiled successfully.
```

---

## 🌐 For Production Hosting

### Option 1: Using Process Manager (PM2) - Recommended

1. **Install PM2 globally:**
```bash
npm install -g pm2
```

2. **Start with PM2:**
```bash
# Start backend
pm2 start backend/server.js --name "bigbets-backend"

# Build Angular for production
npm run build

# Serve Angular with a simple server
npm install -g serve
pm2 start "serve -s dist/angular-website -l 4200" --name "bigbets-frontend"

# Save the PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
```

### Option 2: Using Docker

Create a `Dockerfile` in the root:

```dockerfile
# Multi-stage build for Angular
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copy backend files
COPY backend/ ./backend/

# Copy built Angular files
COPY --from=build /app/dist/angular-website ./dist/angular-website

# Install serve to serve Angular
RUN npm install -g serve concurrently

# Expose ports
EXPOSE 3001 4200

# Start both services
CMD ["sh", "-c", "cd backend && node server.js & serve -s dist/angular-website -l 4200"]
```

### Option 3: Traditional Hosting

**For Angular (Frontend):**
1. Build: `npm run build`
2. Upload `dist/angular-website` folder to hosting (Netlify, Vercel, etc.)

**For Backend:**
1. Upload `backend` folder to Node.js hosting (Heroku, Railway, etc.)
2. Set environment variables
3. Start with `node server.js`

---

## 🔧 Production Environment Variables

Create `.env` file in backend for production:

```env
# Email Configuration
SMTP_USER=contact@bigbets.ai
SMTP_PASS=your_app_password

# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend URL (your production domain)
FRONTEND_URL=https://yourdomain.com
```

---

## 🌍 Popular Hosting Options

### Free Options:
- **Frontend:** Netlify, Vercel, GitHub Pages
- **Backend:** Railway, Render, Fly.io (free tier)

### Paid Options:
- **AWS:** EC2 + S3 + CloudFront
- **Digital Ocean:** Droplets
- **Heroku:** Easy deployment
- **Azure:** App Service

---

## 📦 Deployment Checklist

- [ ] Configure production email credentials
- [ ] Update `FRONTEND_URL` in backend `.env`
- [ ] Build Angular: `npm run build`
- [ ] Test email functionality
- [ ] Set up SSL certificates (HTTPS)
- [ ] Configure domain DNS
- [ ] Set up monitoring
- [ ] Enable error logging

---

## 🚀 One-Click Deployment

### Deploy to Railway (Backend):

1. Sign up at https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Set root directory to `/backend`
5. Add environment variables:
   - `SMTP_USER`
   - `SMTP_PASS`
   - `PORT` = 3001
   - `NODE_ENV` = production
   - `FRONTEND_URL` = your frontend URL

### Deploy to Netlify (Frontend):

1. Sign up at https://netlify.com
2. Click "Add new site" → "Import from Git"
3. Select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/angular-website`
5. Deploy!

---

## 🔄 Development Workflow

1. **Start development:**
   ```bash
   npm start
   ```

2. **Make changes** to frontend or backend

3. **Frontend auto-reloads** when you save changes

4. **Backend requires restart** (or use `nodemon` for auto-restart):
   ```bash
   cd backend
   npm run dev
   ```

---

## 🐛 Troubleshooting

### Port already in use:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <process_id> /F

netstat -ano | findstr :4200
taskkill /PID <process_id> /F
```

### Backend not connecting:
- Check if `.env` file exists in `backend` folder
- Verify email credentials
- Check port 3001 is not blocked

### Frontend not connecting to backend:
- Verify backend is running on port 3001
- Check CORS configuration
- Update API URL if needed

---

## 📞 Quick Commands Reference

```bash
# Development
npm start                           # Start both
npm run start:frontend-only         # Frontend only
npm run start:backend-only          # Backend only

# Production Build
npm run build                       # Build Angular

# Testing
npm test                            # Run tests
cd backend && node test-email.js    # Test email

# Stop Everything
Ctrl + C                            # Stop both services
```

---

## ✅ Benefits of This Setup

- ✅ One command to start everything
- ✅ Color-coded terminal output
- ✅ Easy to deploy
- ✅ Production-ready
- ✅ Works on Windows, Mac, Linux
- ✅ No need to open multiple terminals

---

## 🎉 You're Ready!

Just run:
```bash
npm start
```

And visit: http://localhost:4200

**Both frontend and backend will start automatically!** 🚀
