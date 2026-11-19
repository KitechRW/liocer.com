import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { generatePages, routes } from '../src/site.mjs';

for (const base of ['', '/liocer.com']) {
  test(`All pages and links resolve at ${base || 'the domain root'}`, () => {
    const pages = generatePages({ base, contactEmail: 'info@liocer.com' });
    assert.equal(pages.size, 7);
    for (const [route, html] of pages) {
      assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${route} must have one H1`);
      assert.match(html, /<html lang="en">/);
      assert.match(html, /name="robots" content="noindex,nofollow"/);
      assert.doesNotMatch(html, /KORDIX|KORDIT|interest=kordix/);
      for (const [, attribute, raw] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
        const value = raw.replaceAll('&amp;', '&');
        if (/^(mailto:|https?:|#|data:)/.test(value)) continue;
        assert.ok(value.startsWith(`${base}/`), `${route}: ${attribute} ${value} must use the deployment base`);
        const clean = value.split(/[?#]/)[0].slice(base.length);
        if (clean.startsWith('/assets/')) {
          assert.ok(existsSync(path.join('public', clean)), `Missing asset ${clean}`);
        } else if (['/styles.css', '/client.js'].includes(clean)) {
          assert.ok(existsSync(path.join('src', clean)));
        } else {
          assert.ok(pages.has(clean), `Missing linked page ${clean}`);
        }
      }
    }
    for (const route of routes) assert.ok(pages.has(route));
  });
}
test('Enquiries have an honest email handoff and correctly labelled fields', () => {
  const html = generatePages({ contactEmail: 'info@liocer.com' }).get('/contact/');
  assert.match(html, /mailto:info@liocer.com/);
  assert.match(html, /Open email app to send/);
  assert.match(html, /Send your draft to LIOCER/);
  assert.doesNotMatch(html, /Your enquiry has been received/);
  for (const id of ['name', 'email', 'organization', 'interest', 'timeline', 'message']) {
    assert.match(html, new RegExp(`for="${id}"`));
    assert.match(html, new RegExp(`id="${id}"`));
  }
});
test('KLEX stays in development and company positioning stays broad', () => {
  const pages = generatePages();
  assert.match(pages.get('/products/klex/'), /In development/);
  assert.match(pages.get('/about/'), /SaaS products and custom software/);
  assert.doesNotMatch(pages.get('/products/klex/'), /Start free trial|Buy now/);
});
test('All self-hosted CSS assets exist', () => {
  const css = readFileSync('src/styles.css', 'utf8');
  for (const [, asset] of css.matchAll(/url\(['"]?\.\/([^)'";]+)['"]?\)/g)) {
    assert.ok(existsSync(path.join('public', asset)), `Missing CSS asset ${asset}`);
  }
});

test('Header branding and contextual product and project journeys survive subdirectory deployment', () => {
  const base = '/liocer.com';
  const pages = generatePages({ base });
  for (const html of pages.values()) {
    const header = html.match(/<header[^>]*>[\s\S]*?<\/header>/)[0];
    assert.match(header, /class="brand-symbol"[^>]*><\/span><span class="wordmark">/);
  }
  const hero = pages.get('/').split('</section>')[0];
  assert.ok(hero.includes('href="/liocer.com/products/klex/">Explore KLEX'));
  assert.equal(pages.get('/custom-software/').match(/href="\/liocer.com\/contact\/\?interest=custom">Discuss a project/g).length, 2);
  assert.match(pages.get('/products/klex/'), /Design concept · In development/);
  const contact = pages.get('/contact/');
  assert.ok(contact.indexOf('id="name"') < contact.indexOf('class="contact-location"'));
});
