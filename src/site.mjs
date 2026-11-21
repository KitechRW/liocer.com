import fs from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

export const routes = ['/', '/products/', '/about/', '/contact/'];
const escape = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const basePath = (value = '') => value === '/' ? '' : `/${value.replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '');

export function generatePages({ base = '', contactEmail = 'info@liocer.com', siteUrl = '', preview = true, socialLinks = {
  Instagram: 'https://www.instagram.com/liocerhq/',
  X: 'https://x.com/liocerhq',
  LinkedIn: 'https://www.linkedin.com/company/liocer/'
} } = {}) {
  base = basePath(base);
  const url = (route = '/') => `${base}${route}`;
  const versionedAsset = (file) => {
    const version = createHash('sha256').update(fs.readFileSync(path.join('src', file))).digest('hex').slice(0, 12);
    return `${url('/' + file)}?v=${version}`;
  };
  const stylesheet = versionedAsset('styles.css');
  const clientScript = versionedAsset('client.js');
  const icon = (name, extra = '') => {
    const original = fs.readFileSync(path.resolve('public/assets/icons', `${name}.svg`), 'utf8');
    return original.replace(/<svg[^>]*>/, `<svg class="icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">`);
  };
  const logo = () => `<a class="brand" href="${url('/')}" aria-label="LIOCER home"><img class="nav-logo" src="${url('/assets/logo-white.png')}" width="630" height="600" alt=""></a>`;
  const link = (text, route, style = 'primary') => `<a class="button button--${style}" href="${url(route)}">${text}</a>`;
  const art = (name, alt, { eager = false, cls = '' } = {}) => `<img class="artwork ${cls}" src="${url(`/assets/artworks/${name}.webp`)}" width="${name === 'saas' ? 1254 : 1672}" height="${name === 'saas' ? 1254 : 941}" alt="${escape(alt)}" ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async">`;
  const eyebrow = (text) => `<p class="eyebrow">${text}</p>`;
  const closing = (heading = 'Have a challenge worth solving together?', copy = 'Tell us where work gets stuck, who it affects and what a better workflow could look like. We’ll explore a shared solution or a tailored project with you.', action = 'Talk through a challenge', route = '/contact/') => `<section class="closing"><div class="container closing__inner"><div><h2>${heading}</h2><p>${copy}</p>${link(action, route, 'light')}</div><div class="closing__art" aria-hidden="true">${art('integrations', '')}</div></div></section>`;
  const head = (title, description, route) => {
    const canonical = siteUrl ? `${siteUrl.replace(/\/$/, '')}${url(route)}` : '';
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta name="theme-color" content="#092B5B">${preview ? '<meta name="robots" content="noindex,nofollow">' : ''}${canonical ? `<link rel="canonical" href="${escape(canonical)}"><meta property="og:url" content="${escape(canonical)}">` : ''}<meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="website"><link rel="icon" href="${url('/assets/symbol-master.png')}" type="image/png"><link rel="preload" href="${url('/assets/fonts/manrope.woff')}" as="font" type="font/woff" crossorigin><link rel="stylesheet" href="${stylesheet}"><script src="${clientScript}" defer></script></head>`;
  };
  const socialIcon = (name) => ({
    Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    X: '<path d="M4 3h3.7L20 21h-3.7L4 3Z"/><path d="M20 3 4 21"/>',
    LinkedIn: '<path fill="currentColor" stroke="none" d="M20.45 3H3.55C3.25 3 3 3.24 3 3.54v16.92c0 .3.25.54.55.54h16.9c.3 0 .55-.24.55-.54V3.54c0-.3-.25-.54-.55-.54ZM8.04 18.4H5.1V9.47h2.94v8.92ZM6.57 8.25a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm11.84 10.15h-2.94v-4.34c0-1.03-.02-2.36-1.44-2.36-1.45 0-1.67 1.13-1.67 2.29v4.41H9.42V9.47h2.82v1.22h.04c.39-.7 1.35-1.44 2.78-1.44 2.98 0 3.53 1.96 3.53 4.5v4.65Z"/>'
  })[name];
  const socials = `<div class="footer-social" aria-label="LIOCER social media">${['Instagram', 'X', 'LinkedIn'].map(name => {
    const glyph = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${socialIcon(name)}</svg>`;
    const profile = socialLinks[name];
    return profile && /^https:\/\//.test(profile) ? `<a href="${escape(profile)}" aria-label="LIOCER on ${name}" rel="me noopener noreferrer" target="_blank">${glyph}<span>${name}</span></a>` : `<span class="social-pending" aria-label="${name} profile link pending">${glyph}<span>${name}</span></span>`;
  }).join('')}</div>`;
  const footer = `<footer class="site-footer"><div class="container">
    <div class="footer-main">
      <div class="footer-identity">${logo(true)}<p>Digital solutions that move business forward.</p></div>
      <nav class="footer-links" aria-label="Explore LIOCER"><h2>Explore</h2>
        <a href="${url('/')}"><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z"/></svg>Home</a><a href="${url('/about/')}"><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20v-1.5a6.5 6.5 0 0 1 13 0V20M16 5.5a3.5 3.5 0 0 1 0 6.8M19 15a5 5 0 0 1 2.5 4.3V20"/></svg>Who we are</a><a href="${url('/products/')}"><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5m8-5v5M7 14h3m4 0h3M7 17h2"/></svg>What we do</a>
      </nav>
      <nav class="footer-links" aria-label="Contact LIOCER"><h2>Contact</h2>
        <a href="${url('/contact/')}"><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.7 8.7 0 0 1-4-.95L3 21l1.95-5.5a8.7 8.7 0 0 1-.95-4A8.5 8.5 0 0 1 12.5 3H13a8.5 8.5 0 0 1 8 8v.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>Get in Touch</a><a href="tel:+250788232369"><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 3a14 14 0 0 1-6-6l3-2-2-5Z"/></svg>078 823 2369</a>
        <a href="mailto:${escape(contactEmail)}"><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>${escape(contactEmail)}</a>
      </nav>
      <div class="footer-location"><h2>Visit us</h2><address><svg class="footer-icon footer-icon--pin" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg><span>NZO’Z HOUSE<br>KK 10 AVE, Zinia Road<br>Kicukiro, Kigali, Rwanda</span></address>
        <a class="footer-directions" href="https://maps.app.goo.gl/GwJLRn3LuifsWMHu8" target="_blank" rel="noopener noreferrer"><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11 20 4l-7 16-2-7-7-2Zm7 2 9-9"/></svg>Get directions</a>
      </div>
    </div>
    <div class="footer-colophon"><span>© ${new Date().getUTCFullYear()} LIOCER</span>${socials}</div>
  </div></footer>`;
  const shell = (route, title, description, content) => `${head(title, description, route)}<body data-page="${route}" data-contact-email="${escape(contactEmail)}"><a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container header-inner">${logo(true)}<button class="menu-toggle" type="button" aria-label="Open menu" aria-controls="site-navigation" aria-expanded="false"><svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button><nav id="site-navigation" aria-label="Main navigation">${[['Home', '/'], ['Who we are', '/about/'], ['What we do', '/products/']].map(([label, href]) => `<a href="${url(href)}" ${route === href ? 'aria-current="page"' : ''}>${label}</a>`).join('')}${link('Get in Touch', '/contact/', 'light')}</nav></div></header><main id="main">${content}</main>${footer}</body></html>`;
  const process = () => `<div class="process-grid">${[['discovery', 'Understand', 'Talk with the people doing the work. Find the friction and shared need.'], ['design', 'Map the workflow', 'Follow each step, handoff and system from beginning to end.'], ['build', 'Build together', 'Shape and develop a practical solution in clear, reviewable stages.'], ['launch', 'Put it to work', 'Support teams as they bring the solution into their daily workflow.'], ['support', 'Maintain and improve', 'Use feedback to keep the software useful as needs evolve.']].map(([i, t, p]) => `<article>${icon(i)}<h3>${t}</h3><p>${p}</p></article>`).join('')}</div>`;
  const home = `
    <section class="ribbon-hero" aria-labelledby="hero-title">
      <img class="ribbon-hero__art" src="${url('/assets/artworks/glass-ribbon.webp')}" alt="" width="1536" height="1024" fetchpriority="high" decoding="async">
      <div class="container ribbon-hero__inner">
        <h1 id="hero-title">Intelligent systems<br><span>for everyday challenges.</span></h1>
        <p>Software engineering company building products for shared business challenges and tailored software for specific needs—connecting workflows from end to end.</p>
        <div class="button-row">${link('See what we build', '/products/')}</div>
      </div>
    </section>
    <section class="section home-who" id="who-we-are" aria-labelledby="who-title">
      <div class="container about-intro__grid">
        <div class="about-intro__copy">
          ${eyebrow('Where the idea began')}
          <h2 id="who-title">Built for challenges people share</h2>
          <p class="lead">Shared challenges deserve connected solutions.</p>
          <p>Before LIOCER, client website projects kept revealing the same pattern: different organizations, similar challenges, separate solutions. That led to a question: what if software could bring people together around a shared solution, connect the full workflow and grow more useful over time? That question guides the products we build and maintain today, alongside tailored projects for needs that are unique.</p>
          ${link('Our story', '/about/')}
        </div>
        <div class="about-intro__art" aria-hidden="true">${art('about', '')}</div>
      </div>
    </section>
    <section class="section home-what" id="what-we-do" aria-labelledby="what-title">
      <div class="container">
        <div class="section-heading"><h2 id="what-title">Designed around the whole workflow</h2><p>From products built for shared needs to tailored projects, we connect the systems and steps people depend on.</p></div>
        <div class="home-capabilities">
          <article>${icon('build')}<h3>Tailored software</h3><p>Applications, portals and internal tools shaped around a specific organization’s people, processes and goals.</p></article>
          <article>${icon('integrations')}<h3>Connected workflows</h3><p>Integrations and automation that link everyday tasks, reduce repeat admin and keep work moving across the process.</p></article>
          <article>${icon('products')}<h3>Products for shared needs</h3><p>Purpose-built software for recurring challenges, developed and maintained as those needs evolve.</p></article>
        </div>
      </div>
    </section>
    <section class="section home-process" id="how-we-work" aria-labelledby="how-title">
      <div class="container">
        <div class="section-heading"><h2 id="how-title">Built with users. Improved in practice.</h2><p>From discovery to ongoing care, we work with the people who know the problem and support the solution as needs change.</p></div>
        ${process()}
      </div>
    </section>${closing()}`;

  const products = `<section class="page-heading container about-heading"><div><h1>Products for<br>everyday work.</h1><p class="lead">We create software for the way organizations work, including our own products developed around everyday needs.</p>${link('Ask about product updates', '/contact/?interest=product')}</div><div class="page-heading__art">${art('saas', 'Layered pearl portals connected by a navy ribbon', { eager: true })}</div></section>`;
  const about = `<section class="page-heading container about-heading"><div><h1>Practical software.<br>Thoughtful engineering.</h1><p class="lead">We are a software engineering company developing practical software for businesses and organizations, including products of our own.</p></div><div class="page-heading__art">${art('about', 'Sapphire, glass and pearl forms fitted into a continuous loop', { eager: true })}</div></section><section class="section section--ice"><div class="container about-story"><h2>Technology should make<br>daily work easier to manage.</h2><div><p>Disconnected tools, repeated data entry and manual follow-up make everyday operations harder than they need to be.</p><p>We design and build software around real needs, then support it as it evolves. Some of that work becomes products of our own.</p></div></div><div class="container mission-grid"><article>${eyebrow('Our mission')}<h3>Help organizations<br>move forward.</h3><p>To design, build and support practical software that simplifies work and connects business processes.</p></article><article>${eyebrow('Our vision')}<h3>Useful technology.<br>Wider possibilities.</h3><p>To become a trusted software company creating accessible technology for businesses across Africa and beyond.</p></article></div></section><section class="section"><div class="container"><div class="section-heading"><h2>What guides<br>our work.</h2><p>Good engineering includes the way we collaborate, the decisions we make and the support that follows delivery.</p></div><div class="values-grid">${[
    ['discovery', 'Practical value', 'Build around problems people need to solve and outcomes they can recognize.'],
    ['partnerships', 'Clear collaboration', 'Keep scope, responsibilities and progress understandable.'],
    ['build', 'Maintainable software', 'Create systems that can be supported, improved and adapted over time.'],
    ['security', 'Responsible data handling', 'Consider access, confidentiality and continuity throughout the work.']
  ].map(([i,t,p])=>`<article>${icon(i)}<h3>${t}</h3><p>${p}</p></article>`).join('')}</div></div></section><section class="section section--ice"><div class="container section-heading"><h2>Software delivery.<br>Supported infrastructure.</h2><div><p>LIOCER leads product development, implementation and client support.</p><p>KITECH supplies server infrastructure and hosting, domain registration and business email for LIOCER, its products and its clients.</p></div></div></section>${closing('Build with us.', 'We welcome clients, product users and partners who see an opportunity to solve useful problems through software.')}`;

  const contact = `<section class="page-heading container contact-heading">
    <h1 id="contact-title">Contact LIOCER</h1>
  </section><section class="section contact-section"><div class="container contact-layout">
    <div class="enquiry-panel"><form id="enquiry-form" hidden>
    <p class="form-intro">${contactEmail ? 'Prepare your draft here, then open it in your email app and press Send to contact LIOCER.' : 'Prepare a brief here, then copy or download it to share.'}</p>
    <div class="form-row"><div class="field"><label for="name">Your name</label><input id="name" name="name" autocomplete="name" required maxlength="120"></div><div class="field"><label for="email">Work email</label><input id="email" name="email" type="email" autocomplete="email" required maxlength="254"></div></div><div class="field"><label for="organization">Organization <span>(optional)</span></label><input id="organization" name="organization" autocomplete="organization" maxlength="180"></div><div class="field"><label for="interest">I’m interested in</label><div class="select-wrap"><select id="interest" name="interest" required><option value="">Select an enquiry type</option><option value="product">Our products</option><option value="partnership">A partnership</option><option value="other">Something else</option></select></div></div><div class="field" id="timeline-field" hidden><label for="timeline">Preferred timeline <span>(optional)</span></label><input id="timeline" name="timeline" placeholder="For example, within the next three months" maxlength="180"></div><div class="field"><label for="message">Tell us a little more</label><textarea id="message" name="message" rows="5" required minlength="10" maxlength="6000" placeholder="What would you like to improve, build or explore?"></textarea></div><button class="button button--primary" type="submit">Prepare draft</button></form>
    <noscript><p>${contactEmail ? `Email your enquiry to <a href="mailto:${escape(contactEmail)}">${escape(contactEmail)}</a>.` : 'Enable JavaScript to prepare your enquiry.'}</p></noscript>
    <section id="enquiry-result" hidden aria-labelledby="result-title">
      <h2 id="result-title" tabindex="-1">${contactEmail ? 'Send your draft to LIOCER' : 'Share your draft'}</h2>
      <p>${contactEmail ? 'Open your email app, review the draft and press Send to deliver it to LIOCER.' : 'Copy or download your brief to share it.'}</p>
      ${contactEmail ? `<a class="button button--primary" id="email-brief" href="mailto:${escape(contactEmail)}">Open email app to send</a>` : ''}
      <pre id="brief-content"></pre>
      <div class="draft-tools"><button type="button" id="edit-brief">Edit draft</button><button type="button" id="copy-brief">Copy draft</button><button type="button" id="download-brief">Download brief</button></div><p id="copy-status" role="status"></p>
    </section></div>
    <aside><h2>Contact details</h2>${contactEmail ? `<a href="mailto:${escape(contactEmail)}">${escape(contactEmail)}</a>` : ''}</aside>
    </div></section>`;

  const metadata = [
    ['/', 'LIOCER — Software Engineering', 'Intelligent software and automation to simplify complex work through tailored client solutions and products developed in-house.', home],
    ['/products/', 'Software Engineering — LIOCER', 'Explore software built by LIOCER, including products of our own.', products],
    ['/about/', 'About LIOCER — Software Engineering', 'Practical software, thoughtful engineering and continued support. Get to know LIOCER.', about],
    ['/contact/', 'Contact LIOCER', 'Talk to LIOCER about software development and partnerships.', contact],
  ];
  const pages = new Map(metadata.map(([route, title, description, content]) => [route, shell(route, title, description, content)]));
  pages.set('/404.html', shell('/404.html', 'Page not found — LIOCER', 'Find your way back to LIOCER.', `<section class="section container error-page">${eyebrow('Page not found')}<h1>Let’s get you<br>back on track.</h1><p>The page you’re looking for may have moved.</p>${link('Return home', '/')}</section>`));
  return pages;
}
