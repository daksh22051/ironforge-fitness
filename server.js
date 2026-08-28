const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');

// Load environment variables from .env file if present
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim();
          if (key && process.env[key] === undefined) {
            process.env[key] = val;
          }
        }
      });
    } catch (e) {}
  }
}
loadEnv();

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@ironforgefitness.demo').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'IronForge@Admin2026!';
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

// In-Memory Session Cache: tokenId -> { email, createdAt, expiresAt }
const activeSessions = new Map();
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 Hours

// Rate Limiter for Login: clientIp -> { count, lockUntil }
const loginRateLimiter = new Map();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 Minutes

function getClientIp(req) {
  return (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1').split(',')[0].trim();
}

function parseCookies(req) {
  const list = {};
  const rc = req.headers.cookie;
  if (rc) {
    rc.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      const key = parts.shift().trim();
      const val = parts.join('=').trim();
      list[key] = decodeURIComponent(val);
    });
  }
  return list;
}

function signToken(tokenId) {
  const hmac = crypto.createHmac('sha256', SESSION_SECRET);
  hmac.update(tokenId);
  const sig = hmac.digest('hex');
  return `${tokenId}.${sig}`;
}

function verifyToken(signedToken) {
  if (!signedToken || typeof signedToken !== 'string') return null;
  const parts = signedToken.split('.');
  if (parts.length !== 2) return null;
  const [tokenId, sig] = parts;
  const expectedHmac = crypto.createHmac('sha256', SESSION_SECRET).update(tokenId).digest('hex');
  
  if (sig.length !== expectedHmac.length) return null;
  try {
    const isValid = crypto.timingSafeEqual(Buffer.from(sig, 'utf8'), Buffer.from(expectedHmac, 'utf8'));
    if (!isValid) return null;
    return tokenId;
  } catch (e) {
    return null;
  }
}

function getAdminSession(req) {
  const cookies = parseCookies(req);
  const signedToken = cookies['ironforge_admin_session'];
  if (!signedToken) return null;

  const tokenId = verifyToken(signedToken);
  if (!tokenId) return null;

  const session = activeSessions.get(tokenId);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(tokenId);
    return null;
  }

  return session;
}

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = (process.env.FRONTEND_URL || '').trim();

// Initialize Database Storage
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'ironforge.db');
const db = new DatabaseSync(DB_PATH);

// Initialize Leads Table
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    goal TEXT NOT NULL,
    preferred_time TEXT NOT NULL,
    experience TEXT NOT NULL,
    whatsapp_opt_in INTEGER NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'NEW',
    created_at TEXT NOT NULL
  )
`);

// Initialize Membership Enrollments Table
db.exec(`
  CREATE TABLE IF NOT EXISTS membership_enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_tier TEXT NOT NULL,
    billing_cycle TEXT NOT NULL,
    price INTEGER NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    start_date TEXT,
    whatsapp_opt_in INTEGER NOT NULL DEFAULT 1,
    status TEXT DEFAULT 'PENDING_ONBOARDING',
    created_at TEXT NOT NULL
  )
`);

// Initialize Contact Messages Table
db.exec(`
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'UNREAD',
    created_at TEXT NOT NULL
  )
`);

const insertContactStmt = db.prepare(`
  INSERT INTO contact_messages (name, email, phone, subject, message, status, created_at)
  VALUES (?, ?, ?, ?, ?, 'UNREAD', ?)
`);

const getContactMessagesStmt = db.prepare(`
  SELECT id, name, email, phone, subject, message, status, created_at
  FROM contact_messages
  ORDER BY id DESC
`);

// Non-destructive Migration: Ensure whatsapp_opt_in column exists in existing databases
try {
  const tableInfo = db.prepare("PRAGMA table_info(leads)").all();
  const hasWhatsappOptIn = tableInfo.some(col => col.name === 'whatsapp_opt_in');
  if (!hasWhatsappOptIn) {
    db.exec(`ALTER TABLE leads ADD COLUMN whatsapp_opt_in INTEGER NOT NULL DEFAULT 0`);
  }
} catch (e) {
  // Column check/migration safeguard
}

const insertLeadStmt = db.prepare(`
  INSERT INTO leads (name, phone, email, goal, preferred_time, experience, whatsapp_opt_in, status, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, 'NEW', ?)
`);

const getLeadsStmt = db.prepare(`
  SELECT id, name, phone, email, goal, preferred_time, experience, whatsapp_opt_in, status, created_at
  FROM leads
  ORDER BY id DESC
`);

const insertMembershipStmt = db.prepare(`
  INSERT INTO membership_enrollments (plan_tier, billing_cycle, price, name, phone, email, start_date, whatsapp_opt_in, status, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PENDING_ONBOARDING', ?)
`);

const getMembershipsStmt = db.prepare(`
  SELECT id, plan_tier, billing_cycle, price, name, phone, email, start_date, whatsapp_opt_in, status, created_at
  FROM membership_enrollments
  ORDER BY id DESC
`);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

// Allowed Form Select Values for Server-Side Validation
const ALLOWED_GOALS = [
  'Build Strength',
  'Build Muscle',
  'Lose Fat',
  'Improve Fitness',
  'Personal Training',
  'Not Sure Yet'
];

const ALLOWED_TIMES = [
  'Early Morning',
  'Morning',
  'Afternoon',
  'Evening'
];

const ALLOWED_EXPERIENCE = [
  'Beginner',
  'Intermediate',
  'Advanced'
];

// Helper to send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = parsedUrl.pathname;

  // --------------------------------------------------------------------------
  // PRODUCTION SECURITY HEADERS & CORS CONFIGURATION
  // --------------------------------------------------------------------------
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  const origin = req.headers.origin;
  if (origin) {
    const isAllowedOrigin = (FRONTEND_URL && origin === FRONTEND_URL) || 
                            origin.includes('localhost') || 
                            origin.includes('127.0.0.1');
    if (isAllowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cookie');
    }
  }

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --------------------------------------------------------------------------
  // HEALTH CHECK ENDPOINT (Safe Production Health & Database Monitoring)
  // --------------------------------------------------------------------------
  if (req.method === 'GET' && pathname === '/api/health') {
    let dbStatus = 'connected';
    try {
      db.prepare('SELECT 1').get();
    } catch (e) {
      dbStatus = 'disconnected';
    }

    return sendJson(res, 200, {
      success: true,
      status: 'ok',
      database: dbStatus
    });
  }

  // --------------------------------------------------------------------------
  // API ROUTE: POST /api/free-trial
  // --------------------------------------------------------------------------
  if (req.method === 'POST' && pathname === '/api/free-trial') {
    let body = '';
    const MAX_PAYLOAD_SIZE = 50 * 1024; // 50 KB limit

    req.on('data', chunk => {
      body += chunk;
      if (body.length > MAX_PAYLOAD_SIZE) {
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        if (!body) {
          return sendJson(res, 400, { success: false, message: 'Empty request payload.' });
        }

        const data = JSON.parse(body);
        
        // 1. Data Normalization
        const name = (data.name || '').replace(/\s+/g, ' ').trim();
        const rawPhone = (data.phone || '').trim();
        const email = (data.email || '').toLowerCase().trim();
        const goal = (data.goal || '').trim();
        const preferredTime = (data.preferredTime || data.time || '').trim();
        const experience = (data.experience || '').trim();
        const whatsappOptIn = (data.whatsappOptIn === true || data.whatsappOptIn === 1 || data.whatsappOptIn === 'true') ? 1 : 0;

        // 2. Name validation (2 to 100 characters)
        if (!name || name.length < 2 || name.length > 100) {
          return sendJson(res, 400, {
            success: false,
            message: 'Please provide your full name (2 to 100 characters).'
          });
        }

        // 3. Phone validation (Indian 10-digit mobile number with optional +91, 91, or 0 prefix)
        const digitsOnly = rawPhone.replace(/\D/g, '');
        let clean10 = '';
        if (digitsOnly.length === 10) {
          clean10 = digitsOnly;
        } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
          clean10 = digitsOnly.slice(1);
        } else if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
          clean10 = digitsOnly.slice(2);
        }

        if (!clean10 || !/^[6-9]\d{9}$/.test(clean10)) {
          return sendJson(res, 400, {
            success: false,
            message: 'Please provide a valid 10-digit mobile phone number.'
          });
        }

        const normalizedPhone = `+91 ${clean10.slice(0, 5)} ${clean10.slice(5)}`;

        // 4. Email validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!email || !emailRegex.test(email) || email.length > 150) {
          return sendJson(res, 400, {
            success: false,
            message: 'Please provide a valid email address.'
          });
        }

        // 5. Goal validation
        if (!ALLOWED_GOALS.includes(goal)) {
          return sendJson(res, 400, {
            success: false,
            message: 'Please select a valid fitness goal from the list.'
          });
        }

        // 6. Preferred Time validation
        if (!ALLOWED_TIMES.includes(preferredTime)) {
          return sendJson(res, 400, {
            success: false,
            message: 'Please select a valid preferred training time.'
          });
        }

        // 7. Experience validation
        if (!ALLOWED_EXPERIENCE.includes(experience)) {
          return sendJson(res, 400, {
            success: false,
            message: 'Please select a valid experience level.'
          });
        }

        // Insert into SQLite Database
        const createdAt = new Date().toISOString();
        const info = insertLeadStmt.run(name, normalizedPhone, email, goal, preferredTime, experience, whatsappOptIn, createdAt);

        return sendJson(res, 200, {
          success: true,
          message: 'Free trial request received.',
          leadId: Number(info.lastInsertRowid),
          name: name,
          goal: goal,
          preferredTime: preferredTime,
          experience: experience,
          whatsappOptIn: Boolean(whatsappOptIn)
        });
      } catch (err) {
        return sendJson(res, 400, {
          success: false,
          message: 'Invalid request format or submission failed.'
        });
      }
    });

    return;
  }

  // --------------------------------------------------------------------------
  // API ROUTE: POST /api/membership/enroll
  // --------------------------------------------------------------------------
  if (req.method === 'POST' && pathname === '/api/membership/enroll') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) req.destroy();
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const planTier = (payload.planTier || '').trim().toUpperCase();
        const billingCycle = (payload.billingCycle || 'MONTHLY').trim().toUpperCase();
        const price = Number(payload.price) || 0;
        const name = (payload.name || '').trim();
        const phone = (payload.phone || '').trim();
        const email = (payload.email || '').trim().toLowerCase();
        const startDate = (payload.startDate || '').trim();
        const whatsappOptIn = payload.whatsappOptIn === false ? 0 : 1;

        // Validation
        const ALLOWED_PLANS = ['BASIC', 'PERFORMANCE', 'ELITE', 'DAY_PASS', 'CLASS_PACK'];
        const ALLOWED_CYCLES = ['MONTHLY', 'ANNUAL', 'SINGLE', 'PACK'];

        if (!ALLOWED_PLANS.includes(planTier)) {
          return sendJson(res, 400, { success: false, message: 'Please select a valid membership plan.' });
        }

        if (!ALLOWED_CYCLES.includes(billingCycle)) {
          return sendJson(res, 400, { success: false, message: 'Please select a valid billing cycle.' });
        }

        if (!name || name.length < 2 || name.length > 80 || !/^[a-zA-Z\s.'-]+$/.test(name)) {
          return sendJson(res, 400, { success: false, message: 'Please provide a valid full name.' });
        }

        const digitsOnly = phone.replace(/\D/g, '');
        let clean10 = '';
        if (digitsOnly.length === 10) {
          clean10 = digitsOnly;
        } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
          clean10 = digitsOnly.slice(1);
        } else if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
          clean10 = digitsOnly.slice(2);
        }

        if (!clean10 || !/^[6-9]\d{9}$/.test(clean10)) {
          return sendJson(res, 400, { success: false, message: 'Please provide a valid 10-digit mobile phone number.' });
        }

        const normalizedPhone = `+91 ${clean10.slice(0, 5)} ${clean10.slice(5)}`;

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!email || !emailRegex.test(email) || email.length > 150) {
          return sendJson(res, 400, { success: false, message: 'Please provide a valid email address.' });
        }

        // Insert into database
        const createdAt = new Date().toISOString();
        const info = insertMembershipStmt.run(planTier, billingCycle, price, name, normalizedPhone, email, startDate, whatsappOptIn, createdAt);

        return sendJson(res, 200, {
          success: true,
          message: 'Membership enrollment received.',
          enrollmentId: Number(info.lastInsertRowid),
          planTier: planTier,
          billingCycle: billingCycle,
          price: price,
          name: name,
          whatsappOptIn: Boolean(whatsappOptIn)
        });
      } catch (err) {
        return sendJson(res, 400, { success: false, message: 'Invalid request payload.' });
      }
    });

    return;
  }

  // --------------------------------------------------------------------------
  // API ROUTE: POST /api/contact/send
  // --------------------------------------------------------------------------
  if (req.method === 'POST' && pathname === '/api/contact/send') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) req.destroy();
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const name = (payload.name || '').trim();
        const email = (payload.email || '').trim().toLowerCase();
        const phone = (payload.phone || '').trim();
        const subject = (payload.subject || 'General Inquiry').trim();
        const message = (payload.message || '').trim();

        // 1. Name validation
        if (!name || name.length < 2 || name.length > 80) {
          return sendJson(res, 400, { success: false, message: 'Please provide your full name (2–80 characters).' });
        }

        // 2. Email validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!email || !emailRegex.test(email) || email.length > 150) {
          return sendJson(res, 400, { success: false, message: 'Please provide a valid email address.' });
        }

        // 3. Phone validation
        const digitsOnly = phone.replace(/\D/g, '');
        let clean10 = '';
        if (digitsOnly.length === 10) {
          clean10 = digitsOnly;
        } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
          clean10 = digitsOnly.slice(1);
        } else if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
          clean10 = digitsOnly.slice(2);
        }

        if (!clean10 || !/^[6-9]\d{9}$/.test(clean10)) {
          return sendJson(res, 400, { success: false, message: 'Please provide a valid 10-digit mobile phone number.' });
        }

        const normalizedPhone = `+91 ${clean10.slice(0, 5)} ${clean10.slice(5)}`;

        // 4. Message validation
        if (!message || message.length < 5 || message.length > 2000) {
          return sendJson(res, 400, { success: false, message: 'Please write a message (at least 5 characters).' });
        }

        // Insert into SQLite
        const createdAt = new Date().toISOString();
        const info = insertContactStmt.run(name, email, normalizedPhone, subject, message, createdAt);

        return sendJson(res, 200, {
          success: true,
          message: 'Thank you! Your message has been received. Our team will get back to you promptly.',
          messageId: Number(info.lastInsertRowid),
          name: name,
          subject: subject
        });
      } catch (err) {
        return sendJson(res, 400, { success: false, message: 'Invalid request payload.' });
      }
    });

    return;
  }

  // --------------------------------------------------------------------------
  // ADMIN AUTHENTICATION API ROUTES
  // --------------------------------------------------------------------------
  if (req.method === 'POST' && pathname === '/api/admin/login') {
    const ip = getClientIp(req);
    const now = Date.now();
    const rate = loginRateLimiter.get(ip) || { count: 0, lockUntil: 0 };

    if (rate.lockUntil > now) {
      const remainingMin = Math.ceil((rate.lockUntil - now) / 60000);
      return sendJson(res, 429, { 
        success: false, 
        error: `Too many failed login attempts. Please try again in ${remainingMin} minute(s).` 
      });
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e5) req.destroy();
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const email = (payload.email || '').trim().toLowerCase();
        const password = payload.password || '';

        const emailMatch = (email === ADMIN_EMAIL);
        
        let passMatch = false;
        try {
          const passBuf = Buffer.from(password, 'utf8');
          const expectedBuf = Buffer.from(ADMIN_PASSWORD, 'utf8');
          passMatch = (passBuf.length === expectedBuf.length) && crypto.timingSafeEqual(passBuf, expectedBuf);
        } catch (e) {}

        if (!emailMatch || !passMatch) {
          rate.count = (rate.count || 0) + 1;
          if (rate.count >= MAX_LOGIN_ATTEMPTS) {
            rate.lockUntil = now + LOCKOUT_DURATION_MS;
          }
          loginRateLimiter.set(ip, rate);
          return sendJson(res, 401, { success: false, error: 'Invalid email or password.' });
        }

        // Reset rate limiter upon successful login
        loginRateLimiter.delete(ip);

        // Generate cryptographically random session token
        const tokenId = crypto.randomBytes(32).toString('hex');
        const expiresAt = now + SESSION_DURATION_MS;
        activeSessions.set(tokenId, { email: ADMIN_EMAIL, createdAt: now, expiresAt });

        const signedCookie = signToken(tokenId);
        const isSecure = (process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https');
        const cookieHeader = `ironforge_admin_session=${signedCookie}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${isSecure ? '; Secure' : ''}`;

        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Set-Cookie': cookieHeader,
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
        });
        res.end(JSON.stringify({ success: true, message: 'Authentication successful.' }));
      } catch (err) {
        return sendJson(res, 400, { success: false, error: 'Invalid request payload.' });
      }
    });
    return;
  }

  if (req.method === 'POST' && pathname === '/api/admin/logout') {
    const cookies = parseCookies(req);
    const signedToken = cookies['ironforge_admin_session'];
    if (signedToken) {
      const tokenId = verifyToken(signedToken);
      if (tokenId) activeSessions.delete(tokenId);
    }

    const isSecure = (process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https');
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Set-Cookie': `ironforge_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${isSecure ? '; Secure' : ''}`,
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
    });
    res.end(JSON.stringify({ success: true, message: 'Logged out successfully.' }));
    return;
  }

  if (req.method === 'GET' && pathname === '/api/admin/session') {
    const session = getAdminSession(req);
    if (!session) {
      return sendJson(res, 401, { success: false, authenticated: false });
    }
    return sendJson(res, 200, {
      success: true,
      authenticated: true,
      admin: { email: session.email }
    });
  }

  // --------------------------------------------------------------------------
  // PROTECTED ADMIN DATA APIs (Require Active Admin Session)
  // --------------------------------------------------------------------------
  if (pathname.startsWith('/api/admin/')) {
    const session = getAdminSession(req);
    if (!session) {
      return sendJson(res, 401, { success: false, error: 'Authentication required' });
    }
  }

  if (req.method === 'GET' && pathname === '/api/admin/stats') {
    try {
      const totalFreeTrials = db.prepare('SELECT count(*) as count FROM leads').get().count;
      const totalMemberships = db.prepare('SELECT count(*) as count FROM membership_enrollments').get().count;
      const totalContactMessages = db.prepare('SELECT count(*) as count FROM contact_messages').get().count;
      
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const newLeads = db.prepare('SELECT count(*) as count FROM leads WHERE created_at >= ?').get(sevenDaysAgo).count;

      return sendJson(res, 200, {
        success: true,
        data: {
          totalFreeTrials,
          totalMemberships,
          totalContactMessages,
          newLeads
        }
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: 'Unable to load stats' });
    }
  }

  if (req.method === 'GET' && pathname === '/api/admin/free-trials') {
    try {
      const rows = getLeadsStmt.all();
      return sendJson(res, 200, {
        success: true,
        data: rows
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: 'Unable to load free trial leads' });
    }
  }

  if (req.method === 'GET' && pathname === '/api/admin/memberships') {
    try {
      const rows = getMembershipsStmt.all();
      return sendJson(res, 200, {
        success: true,
        data: rows
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: 'Unable to load membership enrollments' });
    }
  }

  if (req.method === 'GET' && pathname === '/api/admin/contact-messages') {
    try {
      const rows = getContactMessagesStmt.all();
      return sendJson(res, 200, {
        success: true,
        data: rows
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: 'Unable to load contact messages' });
    }
  }

  if (req.method === 'GET' && pathname === '/api/admin/recent-activity') {
    try {
      const latestLeads = db.prepare("SELECT id, name, goal as detail, created_at, 'Free Trial' as type FROM leads ORDER BY id DESC LIMIT 5").all();
      const latestMembers = db.prepare("SELECT id, name, (plan_tier || ' (' || billing_cycle || ')') as detail, created_at, 'Membership' as type FROM membership_enrollments ORDER BY id DESC LIMIT 5").all();
      const latestMessages = db.prepare("SELECT id, name, subject as detail, created_at, 'Contact Inquiry' as type FROM contact_messages ORDER BY id DESC LIMIT 5").all();

      const combined = [...latestLeads, ...latestMembers, ...latestMessages]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 10);

      return sendJson(res, 200, {
        success: true,
        data: combined
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: 'Unable to load recent activity' });
    }
  }

  // --------------------------------------------------------------------------
  // API ROUTE: GET /api/membership/enrollments (Development Only)
  // --------------------------------------------------------------------------
  if (req.method === 'GET' && pathname === '/api/membership/enrollments') {
    try {
      const enrollments = getMembershipsStmt.all();
      return sendJson(res, 200, {
        success: true,
        environment: 'DEVELOPMENT ONLY',
        count: enrollments.length,
        enrollments: enrollments
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: 'Failed to retrieve enrollments.' });
    }
  }

  // --------------------------------------------------------------------------
  // STATIC FILE SECURITY: Protect /data/, .db, .env, source code & dotfiles
  // --------------------------------------------------------------------------
  let cleanUrl = pathname;
  if (cleanUrl === '/' || cleanUrl === '') cleanUrl = '/index.html';

  if (
    cleanUrl.startsWith('/data') || 
    cleanUrl.endsWith('.db') || 
    cleanUrl.includes('..') ||
    cleanUrl === '/server.js' ||
    cleanUrl === '/.gitignore' ||
    cleanUrl.startsWith('/.env') ||
    cleanUrl.includes('.env') ||
    cleanUrl === '/admin.html' ||
    cleanUrl === '/admin-login.html' ||
    cleanUrl.startsWith('/scratch')
  ) {
    res.writeHead(403, { 
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
    });
    res.end('403 Forbidden');
    return;
  }

  // Handle /admin/login clean route
  if (cleanUrl === '/admin/login' || cleanUrl === '/admin/login/') {
    const session = getAdminSession(req);
    if (session) {
      res.writeHead(302, { 'Location': '/admin' });
      res.end();
      return;
    }
    const loginPath = path.join(__dirname, 'admin-login.html');
    if (fs.existsSync(loginPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
      });
      fs.createReadStream(loginPath).pipe(res);
      return;
    }
  }

  // Handle /admin clean route (Protected Admin Dashboard)
  if (cleanUrl === '/admin' || cleanUrl === '/admin/') {
    const session = getAdminSession(req);
    if (!session) {
      res.writeHead(302, { 'Location': '/admin/login' });
      res.end();
      return;
    }
    const adminPath = path.join(__dirname, 'admin.html');
    if (fs.existsSync(adminPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      fs.createReadStream(adminPath).pipe(res);
      return;
    }
  }

  // Handle /membership clean route
  if (cleanUrl === '/membership' || cleanUrl === '/membership/') {
    const membershipPath = path.join(__dirname, 'membership.html');
    if (fs.existsSync(membershipPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      fs.createReadStream(membershipPath).pipe(res);
      return;
    }
  }

  // Handle /facilities clean route
  if (cleanUrl === '/facilities' || cleanUrl === '/facilities/') {
    const facilitiesPath = path.join(__dirname, 'facilities.html');
    if (fs.existsSync(facilitiesPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      fs.createReadStream(facilitiesPath).pipe(res);
      return;
    }
  }

  // Handle /location clean route
  if (cleanUrl === '/location' || cleanUrl === '/location/') {
    const locationPath = path.join(__dirname, 'location.html');
    if (fs.existsSync(locationPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      fs.createReadStream(locationPath).pipe(res);
      return;
    }
  }

  // Handle /contact clean route
  if (cleanUrl === '/contact' || cleanUrl === '/contact/') {
    const contactPath = path.join(__dirname, 'contact.html');
    if (fs.existsSync(contactPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      fs.createReadStream(contactPath).pipe(res);
      return;
    }
  }

  // Handle /transformations clean route
  if (cleanUrl === '/transformations' || cleanUrl === '/transformations/') {
    const transformationsPath = path.join(__dirname, 'transformations.html');
    if (fs.existsSync(transformationsPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      fs.createReadStream(transformationsPath).pipe(res);
      return;
    }
  }

  // Handle /trainers clean route
  if (cleanUrl === '/trainers' || cleanUrl === '/trainers/') {
    const trainersPath = path.join(__dirname, 'trainers.html');
    if (fs.existsSync(trainersPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      fs.createReadStream(trainersPath).pipe(res);
      return;
    }
  }

  // Handle program clean routes e.g. /programs/strength-power or /programs/strength-power/
  const programMatch = cleanUrl.match(/^\/programs\/([a-zA-Z0-9-]+)\/?$/);
  if (programMatch) {
    const slug = programMatch[1];
    const programHtmlPath = path.join(__dirname, 'programs', `${slug}.html`);
    if (fs.existsSync(programHtmlPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      fs.createReadStream(programHtmlPath).pipe(res);
      return;
    }
  }

  // Handle /programs clean route (Dedicated Programs Showcase Page)
  if (cleanUrl === '/programs' || cleanUrl === '/programs/') {
    const programsPath = path.join(__dirname, 'programs.html');
    if (fs.existsSync(programsPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      fs.createReadStream(programsPath).pipe(res);
      return;
    }
  }

  const filePath = path.join(__dirname, cleanUrl);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
      });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Ironforge Fitness server running at http://localhost:${PORT}/ (Environment: ${process.env.NODE_ENV || 'development'})`);
});

// Graceful Shutdown Handlers (SIGTERM, SIGINT)
function handleGracefulShutdown(signal) {
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
  server.close(() => {
    console.log('HTTP server closed.');
    try {
      db.close();
      console.log('Database connections closed cleanly.');
    } catch (e) {}
    process.exit(0);
  });

  // Force exit if shutdown takes too long
  setTimeout(() => {
    console.error('Graceful shutdown timed out. Forcing process exit.');
    process.exit(1);
  }, 5000);
}

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
