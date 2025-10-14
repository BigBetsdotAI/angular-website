# 🚀 Production Deployment Guide

## 📋 Overview

This guide covers multiple deployment options for your BigBets.ai Angular + Node.js application.

---

## 🎯 Deployment Options

1. **Docker** (Recommended for full control)
2. **PM2** (Easy Node.js process management)
3. **Cloud Platforms** (Easiest)
   - Netlify/Vercel (Frontend)
   - Railway/Render (Backend)

---

## 🐳 Option 1: Docker Deployment

### Prerequisites:
- Docker installed
- Docker Compose installed

### Steps:

1. **Create `.env` file in backend folder:**
```env
SMTP_USER=ashishkumarthakur909@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=contact@bigbets.ai
```

2. **Build and run with Docker Compose:**
```bash
docker-compose up -d
```

3. **Check status:**
```bash
docker-compose ps
docker-compose logs -f
```

4. **Stop:**
```bash
docker-compose down
```

### What This Does:
- ✅ Builds both frontend and backend
- ✅ Runs them in separate containers
- ✅ Auto-restarts if they crash
- ✅ Network isolation between services

---

## ⚙️ Option 2: PM2 Deployment

### Prerequisites:
```bash
npm install -g pm2
```

### For Backend:

1. **Create PM2 ecosystem file:**
```bash
cd backend
```

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'bigbets-backend',
    script: './server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
```

2. **Start with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### For Frontend:

1. **Build Angular:**
```bash
cd ..
npm run build
```

2. **Serve with PM2:**
```bash
npm install -g serve
pm2 start "serve -s dist/angular-website -l 4200" --name bigbets-frontend
pm2 save
```

### PM2 Commands:
```bash
pm2 list              # List all processes
pm2 logs              # View logs
pm2 restart all       # Restart all
pm2 stop all          # Stop all
pm2 delete all        # Remove all
pm2 monit             # Monitor resources
```

---

## ☁️ Option 3: Cloud Deployment (Easiest)

### 3A. Deploy Backend to Railway

1. **Sign up:** https://railway.app
2. **Click "New Project"** → "Deploy from GitHub"
3. **Select your repository**
4. **Configure:**
   - Root Directory: `/backend`
   - Start Command: `node server.js`
5. **Add environment variables:**
   ```
   SMTP_USER=ashishkumarthakur909@gmail.com
   SMTP_PASS=your_app_password
   ADMIN_EMAIL=contact@bigbets.ai
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://your-frontend.netlify.app
   ```
6. **Deploy!**
7. **Copy the deployment URL** (e.g., `https://your-app.railway.app`)

### 3B. Deploy Frontend to Netlify

1. **Sign up:** https://netlify.com
2. **Click "Add new site"** → "Import an existing project"
3. **Connect to GitHub** and select your repository
4. **Configure build settings:**
   ```
   Build command: npm run build
   Publish directory: dist/angular-website
   ```
5. **Add environment variable** (if needed):
   ```
   API_URL=https://your-app.railway.app
   ```
6. **Deploy!**

### 3C. Update API URL in Angular

Update `src/app/core/services/contact.service.ts`:
```typescript
private apiUrl = 'https://your-app.railway.app/api';
```

---

## 🌐 Option 4: Traditional VPS Hosting

### For Ubuntu/Debian Server:

1. **Connect to server:**
```bash
ssh user@your-server-ip
```

2. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install Nginx:**
```bash
sudo apt-get install nginx
```

4. **Clone your repository:**
```bash
cd /var/www
git clone https://github.com/BigBetsdotAI/angular-website.git
cd angular-website
```

5. **Setup Backend:**
```bash
cd backend
npm install --production
cp .env.example .env
nano .env  # Add your credentials
```

6. **Setup Frontend:**
```bash
cd ..
npm install
npm run build
```

7. **Install PM2 and start services:**
```bash
sudo npm install -g pm2
cd backend
pm2 start server.js --name bigbets-backend
pm2 startup systemd
pm2 save
```

8. **Configure Nginx:**
```bash
sudo nano /etc/nginx/sites-available/bigbets
```

Add:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /var/www/angular-website/dist/angular-website;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/bigbets /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

10. **Setup SSL (HTTPS):**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🔐 Environment Variables

### Development (.env):
```env
SMTP_USER=ashishkumarthakur909@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=contact@bigbets.ai
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:4200
```

### Production (.env):
```env
SMTP_USER=ashishkumarthakur909@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=contact@bigbets.ai
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com
```

---

## 📊 Monitoring & Logs

### PM2 Monitoring:
```bash
pm2 monit              # Real-time monitoring
pm2 logs               # View all logs
pm2 logs backend       # View backend logs only
```

### Docker Monitoring:
```bash
docker-compose logs -f              # Follow all logs
docker-compose logs -f backend      # Backend logs only
docker stats                         # Resource usage
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example:

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## ✅ Pre-Deployment Checklist

- [ ] Email credentials configured in `.env`
- [ ] `NODE_ENV=production` set
- [ ] `FRONTEND_URL` updated to production URL
- [ ] Angular built with `npm run build`
- [ ] Backend tested locally
- [ ] Contact form tested
- [ ] SSL/HTTPS configured
- [ ] Domain DNS configured
- [ ] Error logging setup
- [ ] Backup strategy in place

---

## 🐛 Troubleshooting

### Backend won't start:
```bash
# Check logs
pm2 logs backend
# or
docker-compose logs backend

# Common issues:
# - Port 3001 already in use
# - Missing .env file
# - Invalid email credentials
```

### Frontend build fails:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Emails not sending:
```bash
# Test email setup
cd backend
node test-email.js
```

---

## 📞 Support & Resources

- **Docker Docs:** https://docs.docker.com
- **PM2 Docs:** https://pm2.keymetrics.io
- **Nginx Docs:** https://nginx.org/en/docs/
- **Railway Docs:** https://docs.railway.app
- **Netlify Docs:** https://docs.netlify.com

---

## 🎉 Success!

Once deployed, your application will be accessible at your domain with:
- ✅ HTTPS encryption
- ✅ Auto-restart on crash
- ✅ Contact form working
- ✅ Professional email responses
- ✅ Scalable architecture

---

**Choose the deployment method that best fits your needs!**
