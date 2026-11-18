# LIOCER Website

A responsive static website for LIOCER: SaaS products, custom software engineering and KLEX legal matter management.

## Development

Requires Node.js 22 or newer. There are no third-party runtime dependencies.

```sh
npm run build
npm run dev
npm run check
```

The build writes `dist/`. The development server defaults to port 5173 and supports `--port` or the `PORT` environment variable.

## Pages

- Home
- Products
- Custom Software
- About
- Contact
- KLEX product page
- A custom 404 page

## GitHub Pages preview

The workflow in `.github/workflows/pages.yml` checks the source, verifies links at both root and project subdirectory paths, builds and deploys `dist/` from `main`.

In repository **Settings > Pages**, select **GitHub Actions** as the build source. The repository must have GitHub Pages available under its current plan. No custom domain or DNS change is needed for the preview.

The workflow obtains the correct project base path from `actions/configure-pages`. To build manually for this project URL:

```sh
BASE_PATH=/liocer.com npm run build
```

Preview builds are marked `noindex,nofollow`. Set `PREVIEW=false` for an approved production build. For a root-domain deployment leave `BASE_PATH` empty and set `SITE_URL` to the origin.

## Contact

The confirmed contact email is **info@liocer.com**. The contact form validates the brief and opens the visitor's email application with a prepared message. It also provides copy and download options. It does not claim that an email was sent or received. Override the address with `CONTACT_EMAIL` when building.

## Identity and content

Original supplied logo assets, optimized artwork, the custom SVG icon collection and self-hosted Manrope/Inter fonts are in `public/assets/`. Font licenses are included alongside the fonts. The wordmark is displayed through a faithful CSS crop of the supplied master rather than recreated as type.

Brand guidelines and website content are in `docs/`. KLEX remains explicitly in development. No customer metrics, endorsements or product screenshots are invented.

The original documents, PNG artworks, logo masters and complete editable asset pack are saved in the LIOCER/Website directory on Drive.
