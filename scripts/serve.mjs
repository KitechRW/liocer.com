import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = Number(portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 5173);
const root = path.resolve('dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(`${root}${path.sep}`) && file !== root) { res.writeHead(403).end(); return; }
    let info;
    try { info = await stat(file); } catch { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(await readFile(path.join(root, '404.html'))); return; }
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(301, { Location: `${pathname}/${new URL(req.url, 'http://localhost').search}` }).end(); return; }
      file = path.join(file, 'index.html');
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch { res.writeHead(500).end('Unable to serve this page.'); }
});
server.listen(port, '0.0.0.0', () => console.log(`Local: http://localhost:${port}`));
