# LIOCER Website

The LIOCER company website: SaaS products, custom software engineering and KLEX legal matter management.

## Development

Requires Node.js 22 or newer. No third-party runtime dependencies.

```sh
npm run build
npm run dev
npm test
```

The site is generated into `dist/`. Set `BASE_PATH=/liocer.com` when building for the GitHub Pages project URL. The Pages workflow builds and publishes the website from `main`.

Brand sources, artwork and the custom SVG icon collection are in `public/assets/` and `docs/`. KLEX is presented as in development.
