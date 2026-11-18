import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { generatePages } from '../src/site.mjs';

const output = path.resolve(process.env.OUTPUT_DIR || 'dist');
if (output === process.cwd() || !output.startsWith(`${process.cwd()}${path.sep}`)) throw new Error('Output must be a subdirectory of the checkout.');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp('public', output, { recursive: true });
await cp('src/styles.css', path.join(output, 'styles.css'));
await cp('src/client.js', path.join(output, 'client.js'));
const preview = process.env.PREVIEW !== 'false';
const pages = generatePages({ base: process.env.BASE_PATH || '', contactEmail: process.env.CONTACT_EMAIL || 'info@liocer.com', siteUrl: process.env.SITE_URL || '', preview });
for (const [route, html] of pages) {
  const file = path.join(output, route.endsWith('.html') ? route : `${route}/index.html`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}
await writeFile(path.join(output, '.nojekyll'), '');
await writeFile(path.join(output, 'robots.txt'), preview ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n');
console.log(`Built ${pages.size} pages in ${output} with base ${process.env.BASE_PATH || '/'}`);
