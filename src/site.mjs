import fs from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

export const routes = ['/', '/products/', '/custom-software/', '/about/', '/contact/', '/products/klex/'];
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
  const logo = (withSymbol = false) => `<a class="brand" href="${url('/')}" aria-label="LIOCER home">${withSymbol ? '<span class="brand-symbol" aria-hidden="true"></span>' : ''}<span class="wordmark"><img src="${url('/assets/logo-master.png')}" width="1600" height="1550" alt="LIOCER"></span></a>`;
  const link = (text, route, style = 'primary') => `<a class="button button--${style}" href="${url(route)}">${text}</a>`;
  const art = (name, alt, { eager = false, cls = '' } = {}) => `<img class="artwork ${cls}" src="${url(`/assets/artworks/${name}.webp`)}" width="${['saas', 'klex'].includes(name) ? 1254 : 1672}" height="${['saas', 'klex'].includes(name) ? 1254 : 941}" alt="${escape(alt)}" ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async">`;
  const eyebrow = (text) => `<p class="eyebrow">${text}</p>`;
  const closing = (heading = 'What could better software make possible?', copy = 'Tell us what you are building, what is slowing your team down or what you want to improve.', action = 'Start a conversation', route = '/contact/') => `<section class="closing"><div class="container closing__inner"><div>${eyebrow('Your next step')}<h2>${heading}</h2><p>${copy}</p>${link(action, route, 'light')}</div><div class="closing__art" aria-hidden="true">${art('integrations', '')}</div></div></section>`;
  const head = (title, description, route) => {
    const canonical = siteUrl ? `${siteUrl.replace(/\/$/, '')}${url(route)}` : '';
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta name="theme-color" content="#092B5B">${preview ? '<meta name="robots" content="noindex,nofollow">' : ''}${canonical ? `<link rel="canonical" href="${escape(canonical)}"><meta property="og:url" content="${escape(canonical)}">` : ''}<meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="website"><link rel="icon" href="${url('/assets/symbol-master.png')}" type="image/png"><link rel="preload" href="${url('/assets/fonts/manrope.woff')}" as="font" type="font/woff" crossorigin><link rel="stylesheet" href="${stylesheet}"><script src="${clientScript}" defer></script></head>`;
  };
  const socialIcon = (name) => ({
    Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    X: '<path d="M4 3h3.7L20 21h-3.7L4 3Z"/><path d="M20 3 4 21"/>',
    LinkedIn: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10v7m0-10v.1M11 17v-7h3v1c.5-.8 1.3-1.3 2.5-1.3 2 0 2.5 1.4 2.5 3V17"/>'
  })[name];
  const socials = `<div class="footer-social" aria-label="LIOCER social media">${['Instagram', 'X', 'LinkedIn'].map(name => {
    const glyph = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${socialIcon(name)}</svg>`;
    const profile = socialLinks[name];
    return profile && /^https:\/\//.test(profile) ? `<a href="${escape(profile)}" aria-label="LIOCER on ${name}" rel="me noopener noreferrer" target="_blank">${glyph}<span>${name}</span></a>` : `<span class="social-pending" aria-label="${name} profile link pending">${glyph}<span>${name}</span></span>`;
  }).join('')}</div>`;
  const footer = `<footer class="site-footer"><div class="container">
    <div class="footer-main">
      <div class="footer-identity">${logo(true)}<p>Digital solutions that move business forward.</p>
        ${socials}
      </div>
      <nav class="footer-links" aria-label="Products and services"><h2>What we build</h2>
        <a href="${url('/products/')}">SaaS products</a>
        <a href="${url('/products/klex/')}">KLEX</a>
        <a href="${url('/custom-software/')}">Projects</a>
      </nav>
      <nav class="footer-links" aria-label="Company"><h2>Company</h2>
        <a href="${url('/about/')}">About LIOCER</a>
        <a href="${url('/contact/?interest=partnership')}">Partnerships</a>
        <a href="${url('/contact/')}">Get in Touch</a>
      </nav>
    </div>
    <div class="footer-colophon"><span>© ${new Date().getUTCFullYear()} LIOCER Ltd.</span><address>Kicukiro, Kigali, Rwanda</address></div>
  </div></footer>`;
  const shell = (route, title, description, content) => `${head(title, description, route)}<body data-page="${route}" data-contact-email="${escape(contactEmail)}"><a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container header-inner">${logo(true)}<button class="menu-toggle" type="button" aria-controls="site-navigation" aria-expanded="false"><span>Menu</span><span class="menu-lines" aria-hidden="true"></span></button><nav id="site-navigation" aria-label="Main navigation">${[['Products', '/products/'], ['Projects', '/custom-software/'], ['About', '/about/']].map(([label, href]) => `<a href="${url(href)}" ${route === href || (href === '/products/' && route === '/products/klex/') ? 'aria-current="page"' : ''}>${label}</a>`).join('')}${link('Get in Touch', '/contact/', 'light')}</nav></div></header><main id="main">${content}</main>${footer}</body></html>`;
  const process = () => `<div class="process-grid">${[['discovery', 'Understand', 'Your goals, users and current ways of working.'], ['design', 'Design', 'A clear scope and a considered experience.'], ['build', 'Build', 'Manageable stages, with progress reviewed together.'], ['launch', 'Launch', 'A prepared environment and a confident start.'], ['support', 'Improve', 'Ongoing support and useful next steps.']].map(([i, t, p]) => `<article>${icon(i)}<h3>${t}</h3><p>${p}</p></article>`).join('')}</div>`;
  const home = `
    <section class="ribbon-hero">
      <img class="ribbon-hero__art" src="${url('/assets/artworks/glass-ribbon.webp')}" alt="" width="1536" height="1024" fetchpriority="high" decoding="async">
      <div class="container ribbon-hero__inner">
        <h1>Software built for<br><span>the way you work.</span></h1>
        <p>We build SaaS products and custom software. KLEX, our legal matter management product, is in development.</p>
        <div class="button-row">${link('Explore KLEX', '/products/klex/')}${link('Discuss a project', '/contact/?interest=custom', 'pearl')}</div>
      </div>
    </section>
    <div class="showcase">
      <section class="showcase-tile showcase-tile--klex">
        <div class="showcase-tile__copy">${eyebrow('KLEX by LIOCER · In development')}
          <h2>Every matter.<br>In clearer view.</h2>
          <p>Legal matter management for the people, documents and deadlines behind each case.</p>
          ${link('Discover KLEX', '/products/klex/', 'outline')}
        </div>
        ${art('klex', 'Pearl matter files held together by a navy ribbon')}
      </section>
      <section class="showcase-tile showcase-tile--custom">
        <div class="showcase-tile__copy">${eyebrow('Custom software')}
          <h2>Built around<br>your business.</h2>
          <p>Applications, portals and integrations shaped around the way your team works.</p>
          ${link('Explore custom software', '/custom-software/', 'outline')}
        </div>
        ${art('custom', 'Precision-crafted navy arch with a pearl inlay')}
      </section>
    </div>
    <section class="section home-process"><div class="container"><h2>How we build.</h2>${process()}</div></section>
    <section class="section about-intro"><div class="container about-intro__grid"><div class="about-intro__copy"><h2>From design to daily use.</h2><p class="lead">We design, build and support software for the teams who use it every day.</p><a class="text-link" href="${url('/about/')}">Meet LIOCER</a></div><div class="about-intro__art">${art('about', 'Sapphire, glass and pearl forms fitted into a continuous loop')}</div></div></section>${closing()}`;

  const products = `<section class="page-heading container"><h1>Useful software.<br>Built to keep improving.</h1><p class="lead">Our SaaS products start with recurring business needs and grow through focused development, real use and feedback.</p></section><section class="section section--ice"><div class="container product-spotlight"><div>${art('klex', 'Organized pearl matter files in a navy folio', { eager: true })}</div><div class="product-spotlight__copy"><span class="status">In development</span><div class="product-signature">KLEX <span>by LIOCER</span></div><h2>Keep legal<br>work connected.</h2><p>Our planned legal matter management platform brings a firm’s public online presence and private practice workspace together.</p><div class="product-tags"><span>Matters</span><span>Documents</span><span>Deadlines</span><span>Billing</span></div>${link('Explore KLEX', '/products/klex/')}</div></div></section><section class="section"><div class="container section-heading"><h2>Built around the work.<br>Improved through use.</h2><div><p>We develop and validate capabilities progressively. Implementation, onboarding and support form part of the product experience.</p><p>Our focus is on software that fits into everyday operations and remains useful as those operations evolve.</p></div></div></section>${closing('Have a need we should understand?', 'We welcome conversations with prospective users and partners who can help shape practical products.')}`;

  const custom = `<section class="page-heading container"><div><h1>Your processes.<br>Your priorities.<br>Your software.</h1><p class="lead">Applications and integrations designed around a specific business need, from the first conversation through launch and support.</p>${link('Discuss a project', '/contact/?interest=custom')}</div><div class="page-heading__art">${art('custom', 'Navy and pearl components precisely fitted together', { eager: true })}</div></section><section class="section section--ice"><div class="container">
    <div class="section-heading"><div>${eyebrow('Example workflow')}<h2>From an inbox to a customer portal.</h2></div><p>A customer asks for an update. Instead of searching a shared inbox, the team opens one record to see who owns the request and which reply the customer has seen.</p></div>
    <ol class="workflow">
      <li>${icon('portal')}<h3>Capture the request</h3><p>A customer asks to change a delivery date. The portal records the request and gives the customer a reference.</p></li>
      <li>${icon('tasks')}<h3>Assign the next action</h3><p>The coordinator assigns the request to dispatch. The owner and due date are visible to the team.</p></li>
      <li>${icon('dashboard')}<h3>Share the update</h3><p>Dispatch confirms the new date. The customer can check the reply and request history in the portal.</p></li>
    </ol>
  </div></section><section class="section section--ice"><div class="container faq-layout"><div>${eyebrow('A few useful answers')}<h2>Before we begin.</h2></div><div class="faq-list">${[
    ['Can you work on an existing application?', 'We can discuss improvements, extensions or integrations for an existing system. The engagement begins with a review of its condition, access and requirements.'],
    ['How are projects priced?', 'Pricing follows the agreed scope, delivery requirements and support needs. An initial conversation helps define what is needed before a proposal is prepared.'],
    ['Do you provide support after launch?', 'Maintenance and support can form part of the engagement, with responsibilities and service commitments agreed in advance.']
  ].map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></div></section>${closing('Start with the problem you want to solve.', 'Bring one example of a task your team handles today. Tell us who does it, which tools they use and where the work slows down.', 'Discuss a project', '/contact/?interest=custom')}`;

  const about = `<section class="page-heading container about-heading"><div><h1>Practical software.<br>Thoughtful engineering.</h1><p class="lead">We are a software engineering company focused on SaaS products and custom software for businesses and organizations.</p></div><div class="page-heading__art">${art('about', 'Sapphire, glass and pearl forms fitted into a continuous loop', { eager: true })}</div></section><section class="section section--ice"><div class="container about-story"><h2>Technology should make<br>daily work easier to manage.</h2><div><p>Disconnected tools, repeated data entry and manual follow-up make everyday operations harder than they need to be.</p><p>We develop reusable products for shared needs and tailored software for specific requirements. Our approach connects development with implementation and continued support.</p></div></div><div class="container mission-grid"><article>${eyebrow('Our mission')}<h3>Help organizations<br>move forward.</h3><p>To design, build and support practical software that simplifies work and connects business processes.</p></article><article>${eyebrow('Our vision')}<h3>Useful technology.<br>Wider possibilities.</h3><p>To become a trusted software company creating accessible technology for businesses across Africa and beyond.</p></article></div></section><section class="section"><div class="container"><div class="section-heading"><h2>What guides<br>our work.</h2><p>Good engineering includes the way we collaborate, the decisions we make and the support that follows delivery.</p></div><div class="values-grid">${[
    ['discovery', 'Practical value', 'Build around problems people need to solve and outcomes they can recognize.'],
    ['partnerships', 'Clear collaboration', 'Keep scope, responsibilities and progress understandable.'],
    ['build', 'Maintainable software', 'Create systems that can be supported, improved and adapted over time.'],
    ['security', 'Responsible data handling', 'Consider access, confidentiality and continuity throughout the work.']
  ].map(([i,t,p])=>`<article>${icon(i)}<h3>${t}</h3><p>${p}</p></article>`).join('')}</div></div></section><section class="section section--ice"><div class="container section-heading"><h2>Software delivery.<br>Supported infrastructure.</h2><div><p>LIOCER leads product development, implementation and client support.</p><p>KITECH supplies server infrastructure and hosting, domain registration and business email for LIOCER, its products and its clients.</p></div></div></section>${closing('Build with us.', 'We welcome clients, product users and partners who see an opportunity to solve useful problems through software.')}`;

  const klexAreas = [['matters', 'Clients & matters', 'Connect accepted work to its people, source records and next actions.'], ['deadlines', 'Schedules & deadlines', 'Bring hearings, verified dates, appointments and preparation into view.'], ['documents', 'Matter documents', 'Organize private matter documents, versions and authorized access.'], ['tasks', 'Tasks & responsibilities', 'Make ownership and follow-up visible across the firm.'], ['time', 'Time & billing', 'Connect billable work, expenses, invoicing and payment follow-up.'], ['dashboard', 'Daily attention', 'Highlight the events, commitments and outstanding work that need attention.']];
  const matterConcept = `<figure class="matter-concept">
    <div class="matter-panel">
      <div class="matter-bar"><strong>KLEX</strong><span>Matter workspace</span></div>
      <div class="matter-body"><h2>Today’s agenda</h2>
        <ul class="agenda">
          <li>${icon('deadlines')}<div><strong>Prepare for the hearing</strong><span>Lakeview lease · Hearing at 09:30</span></div><span class="agenda-owner">Owner · Counsel</span></li>
          <li>${icon('documents')}<div><strong>File the response</strong><span>Orchid supply agreement · Due by 15:00</span></div><span class="agenda-owner">Owner · Associate</span></li>
          <li>${icon('tasks')}<div><strong>Request signed instructions</strong><span>Cedar advisory · Awaiting client</span></div><span class="agenda-owner">Owner · Case manager</span></li>
        </ul>
      </div>
    </div><figcaption>Design concept · In development</figcaption>
  </figure>`;
  const klex = `<section class="klex-hero section--ice"><div class="container klex-feature"><div class="klex-feature__copy">${eyebrow('Legal matter management')}<span class="status">In development</span><h1>What needs<br>attention today?</h1><p class="lead">KLEX is being designed to help law firms see upcoming hearings, filing deadlines and who owns the next action on each matter.</p>${link('Express interest', '/contact/?interest=klex')}<p class="endorsement">A SaaS product by LIOCER.</p></div>${matterConcept}</div></section><section class="section"><div class="container"><div class="section-heading"><h2>A connected view<br>of legal work.</h2><p>KLEX is being designed around the matter: a court case, contract assignment, advisory engagement or other accepted legal work.</p></div><p class="eyebrow">Planned capabilities</p><div class="capability-grid">${klexAreas.map(([i,t,p])=>`<article>${icon(i)}<h3>${t}</h3><p>${p}</p></article>`).join('')}</div></div></section><section class="section section--navy"><div class="container section-heading"><h2>From the first enquiry<br>to an active matter.</h2><div><p>A new enquiry can lead to an appointment, a decision to take on the work and the first task for the team.</p><p>KLEX will also connect a firm’s public online presence, enquiries and consultation requests with its private workspace.</p></div></div></section><section class="section"><div class="container section-heading"><div>${eyebrow('A product taking shape')}<h2>Developed progressively.<br>Validated with practitioners.</h2></div><div><p>KLEX is in development. Planned capabilities will be introduced through validated releases as the product progresses toward pilot and commercial use.</p><p>We welcome conversations with legal professionals interested in discussing their workflows and contributing feedback.</p>${link('Discuss KLEX with us', '/contact/?interest=klex')}</div></div></section>`;

  const contact = `<section class="page-heading container contact-heading">
    <h1 id="contact-title">Contact LIOCER</h1>
  </section><section class="section contact-section"><div class="container contact-layout">
    <div class="enquiry-panel"><form id="enquiry-form" hidden>
    <p class="form-intro">${contactEmail ? 'Prepare your draft here, then open it in your email app and press Send to contact LIOCER.' : 'Prepare a brief here, then copy or download it to share.'}</p>
    <div class="form-row"><div class="field"><label for="name">Your name</label><input id="name" name="name" autocomplete="name" required maxlength="120"></div><div class="field"><label for="email">Work email</label><input id="email" name="email" type="email" autocomplete="email" required maxlength="254"></div></div><div class="field"><label for="organization">Organization <span>(optional)</span></label><input id="organization" name="organization" autocomplete="organization" maxlength="180"></div><div class="field"><label for="interest">I’m interested in</label><div class="select-wrap"><select id="interest" name="interest" required><option value="">Select an enquiry type</option><option value="product">SaaS products</option><option value="klex">KLEX</option><option value="custom">Custom software</option><option value="partnership">A partnership</option><option value="other">Something else</option></select></div></div><div class="field" id="timeline-field" hidden><label for="timeline">Preferred timeline <span>(optional)</span></label><input id="timeline" name="timeline" placeholder="For example, within the next three months" maxlength="180"></div><div class="field"><label for="message">Tell us a little more</label><textarea id="message" name="message" rows="5" required minlength="10" maxlength="6000" placeholder="What would you like to improve, build or explore?"></textarea></div><button class="button button--primary" type="submit">Prepare draft</button></form>
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
    ['/', 'LIOCER — SaaS Products & Custom Software', 'Software engineering for businesses and organizations. SaaS products and custom applications built around real business needs.', home],
    ['/products/', 'SaaS Products — LIOCER', 'Explore LIOCER’s SaaS products, including KLEX legal matter management, currently in development.', products],
    ['/custom-software/', 'Custom Software Development — LIOCER', 'Business applications, portals, integrations and workflow solutions tailored to your organization.', custom],
    ['/about/', 'About LIOCER — Software Engineering', 'Practical software, thoughtful engineering and continued support. Get to know LIOCER.', about],
    ['/contact/', 'Contact LIOCER', 'Talk to LIOCER about SaaS products, custom software projects and partnerships.', contact],
    ['/products/klex/', 'KLEX — Legal Matter Management by LIOCER', 'Discover KLEX, LIOCER’s legal matter management product in development, and express interest.', klex]
  ];
  const pages = new Map(metadata.map(([route, title, description, content]) => [route, shell(route, title, description, content)]));
  pages.set('/404.html', shell('/404.html', 'Page not found — LIOCER', 'Find your way back to LIOCER.', `<section class="section container error-page">${eyebrow('Page not found')}<h1>Let’s get you<br>back on track.</h1><p>The page you’re looking for may have moved.</p>${link('Return home', '/')}</section>`));
  return pages;
}
