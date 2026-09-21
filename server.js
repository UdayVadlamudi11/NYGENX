const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

const contactsFile = path.join(__dirname, 'contacts.json');
if (!fs.existsSync(contactsFile)) {
  fs.writeFileSync(contactsFile, JSON.stringify([], null, 2));
}

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(urlObj.pathname);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-App-Id');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle Base44 Public Settings API
  if (
    pathname.includes('/public-settings/by-id/') ||
    pathname.includes('/prod/public-settings/by-id/')
  ) {
    const appId = pathname.split('/').pop() || '6a9565513151a3359547b34b';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      id: appId,
      public_settings: 'public_without_login',
      status: 'active'
    }));
    return;
  }

  // Handle App Analytics Logs
  if (pathname.startsWith('/api/app-logs/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // Handle User Me auth check
  if (pathname.includes('/entities/User/me') || pathname.includes('/users/me')) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Authentication required' }));
    return;
  }

  // Handle ContactMessage entity creation
  if (
    (pathname.includes('/entities/ContactMessage') || pathname.includes('/ContactMessage')) &&
    req.method === 'POST'
  ) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const messageData = JSON.parse(body);
        const contactEntry = {
          id: 'msg_' + Date.now(),
          ...messageData,
          createdAt: new Date().toISOString()
        };
        const currentContacts = JSON.parse(fs.readFileSync(contactsFile, 'utf8') || '[]');
        currentContacts.push(contactEntry);
        fs.writeFileSync(contactsFile, JSON.stringify(currentContacts, null, 2));

        console.log('New consultation / contact request received:', contactEntry);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(contactEntry));
      } catch (err) {
        console.error('Error saving contact message:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  // Generic fallback for any other entities API
  if (pathname.includes('/entities/') || pathname.startsWith('/api/apps/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: [] }));
    return;
  }

  // File resolution for static files
  let relativePath = pathname.replace(/^\/+/, '');
  if (!relativePath) relativePath = 'index.html';

  let filePath = path.join(PUBLIC_DIR, relativePath);

  // Check if file exists in root or public folder
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const publicFilePath = path.join(PUBLIC_DIR, 'public', relativePath);
    if (fs.existsSync(publicFilePath) && !fs.statSync(publicFilePath).isDirectory()) {
      filePath = publicFilePath;
    } else {
      // Check if it's an asset
      if (pathname.startsWith('/assets/')) {
        const assetPath = path.join(PUBLIC_DIR, pathname);
        if (fs.existsSync(assetPath)) {
          filePath = assetPath;
        }
      }
    }
  }

  // If static file found, serve it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // SPA Route Fallback: Serve index.html for client-side routing
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    fs.createReadStream(indexPath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(` NYGENX Web Application is running!`);
  console.log(` Local URL: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
