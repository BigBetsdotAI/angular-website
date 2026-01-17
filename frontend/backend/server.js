const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
require('dotenv').config();

const emailService = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting - prevent spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions. Please try again later.',
    retryAfter: '15 minutes'
  }
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url} from ${req.headers.origin}`);
  next();
});

// Middleware
app.use(cors({
  origin: true, // Allow any origin
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Apply rate limiting to contact form
app.use('/api/contact', limiter);

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { quickName, quickEmail, quickPhone, quickMessage } = req.body;

    console.log(`📧 New contact form submission from: ${quickName} (${quickEmail})`);

    // Validate required fields
    if (!quickName || !quickEmail || !quickMessage) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(quickEmail)) {
      console.log('❌ Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Prepare email data
    const emailData = {
      name: quickName,
      email: quickEmail,
      phone: quickPhone || 'Not provided',
      message: quickMessage,
      timestamp: new Date().toLocaleString()
    };

    console.log('📤 Attempting to send emails...');

    // Send email
    const emailResult = await emailService.sendContactEmail(emailData);

    if (emailResult.success) {
      console.log('✅ Emails sent successfully!');
      res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
    } else {
      console.log('❌ Email sending failed:', emailResult.error);
      throw new Error(emailResult.error);
    }

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// Admin dashboard endpoint
app.get('/api/admin/dashboard', (req, res) => {
  const stats = {
    serverStartTime: new Date().toISOString(),
    emailConfig: {
      user: process.env.SMTP_USER || 'Not configured',
      adminEmail: process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'Not configured'
    },
    endpoints: [
      { method: 'POST', path: '/api/contact', description: 'Submit contact form' },
      { method: 'GET', path: '/api/health', description: 'Health check' },
      { method: 'GET', path: '/api/admin/dashboard', description: 'Admin dashboard' }
    ],
    lastHealthCheck: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    message: 'Admin dashboard data',
    data: stats
  });
});

// Simple admin page
app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>BigBets.ai - Admin Dashboard</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
            .container { max-width: 1200px; margin: 0 auto; }
            .header { background: #f82d19; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: bold; }
            .status.online { background: #4CAF50; color: white; }
            .status.offline { background: #f44336; color: white; }
            .endpoint { background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 4px; }
            button { background: #f82d19; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin: 5px; }
            button:hover { background: #dc2626; }
            .log { background: #1a1a1a; color: #00ff00; padding: 15px; border-radius: 4px; font-family: monospace; height: 200px; overflow-y: scroll; }
            #emailTest { margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 BigBets.ai Admin Dashboard</h1>
                <p>Monitor your contact form and email services</p>
            </div>
            
            <div class="card">
                <h2>📊 Server Status</h2>
                <p>Backend Server: <span class="status online">ONLINE</span></p>
                <p>Email Service: <span id="emailStatus" class="status online">CHECKING...</span></p>
                <p>Last Updated: <span id="lastUpdate">${new Date().toLocaleString()}</span></p>
                <button onclick="checkStatus()">🔄 Refresh Status</button>
                <button onclick="testEmail()">📧 Test Email</button>
            </div>
            
            <div class="card">
                <h2>📧 Email Configuration</h2>
                <p><strong>SMTP User:</strong> ${process.env.SMTP_USER || 'Not configured'}</p>
                <p><strong>Admin Email:</strong> ${process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'Not configured'}</p>
                <p><strong>Frontend URL:</strong> ${process.env.FRONTEND_URL || 'http://localhost:4200'}</p>
            </div>
            
            <div class="card">
                <h2>🔗 API Endpoints</h2>
                <div class="endpoint"><strong>POST</strong> /api/contact - Submit contact form</div>
                <div class="endpoint"><strong>GET</strong> /api/health - Health check</div>
                <div class="endpoint"><strong>GET</strong> /api/admin/dashboard - Admin dashboard data</div>
            </div>
            
            <div class="card">
                <h2>📋 Activity Log</h2>
                <div class="log" id="activityLog">
                    Server started at: ${new Date().toLocaleString()}
                    Email service initialized
                    Admin dashboard loaded
                </div>
            </div>
        </div>
        
        <script>
            async function checkStatus() {
                try {
                    const response = await fetch('/api/health');
                    const data = await response.json();
                    
                    document.getElementById('emailStatus').textContent = 'ONLINE';
                    document.getElementById('emailStatus').className = 'status online';
                    document.getElementById('lastUpdate').textContent = new Date().toLocaleString();
                    
                    addLog('✅ Status check successful');
                } catch (error) {
                    document.getElementById('emailStatus').textContent = 'OFFLINE';
                    document.getElementById('emailStatus').className = 'status offline';
                    addLog('❌ Status check failed: ' + error.message);
                }
            }
            
            async function testEmail() {
                addLog('📧 Testing email functionality...');
                try {
                    const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            quickName: 'Admin Test',
                            quickEmail: '${process.env.SMTP_USER || 'test@example.com'}',
                            quickPhone: '+91 836 887 1848',
                            quickMessage: 'This is a test message from the admin dashboard to verify email functionality.'
                        })
                    });
                    
                    const data = await response.json();
                    if (data.success) {
                        addLog('✅ Test email sent successfully!');
                        alert('✅ Test email sent successfully! Check your inbox.');
                    } else {
                        addLog('❌ Test email failed: ' + data.message);
                        alert('❌ Test email failed: ' + data.message);
                    }
                } catch (error) {
                    addLog('❌ Test email error: ' + error.message);
                    alert('❌ Test email error: ' + error.message);
                }
            }
            
            function addLog(message) {
                const log = document.getElementById('activityLog');
                const time = new Date().toLocaleString();
                log.textContent += '\\n[' + time + '] ' + message;
                log.scrollTop = log.scrollHeight;
            }
            
            // Auto-refresh status every 30 seconds
            setInterval(checkStatus, 30000);
            
            // Initial status check
            checkStatus();
        </script>
    </body>
    </html>
  `);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📧 Email service configured for: ${process.env.SMTP_USER || 'Not configured'}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:4200'}`);
});

module.exports = app;
