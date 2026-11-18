# LIOCER — Brand Guidelines

Proposed visual system · 18 November 2026

## 1. Brand foundation

LIOCER is a software engineering company focused on SaaS products and open to custom software projects. The visual identity should feel precise, assured, modern and considered. Premium expression comes from typography, proportion, space and consistency.

Brand slogan: **Digital solutions that move business forward.**

The supplied symbol and wordmark are the identity masters. The supplied full lockup contains an earlier slogan; use the current slogan above as separate live text in new layouts. Preserve the original artwork files.

## 2. Logo

- Preserve the supplied ribbon geometry, orientation, internal gaps and wordmark letterforms.
- Primary use: navy on white. Reverse use: white on the brand navy.
- Use the symbol on compact digital surfaces. Use the full wordmark where company recognition is needed.
- Proposed minimum symbol width: 32 px. Use 48 px or more when its internal gaps become unclear. Check the actual rendered artwork on the target device.
- Proposed clear space: at least 25% of the symbol's visible height around the symbol or complete lockup.
- Do not stretch, rotate, add outlines, recolor individual ribbon segments, apply shadows to the logo or replace its custom lettering with a font.
- Decorative ribbon artwork is separate from the logo. Keep the identifying logo complete and legible.
- Use the supplied raster masters for review. Produce faithful vector masters before large-format applications; do not auto-trace and accept changed geometry.

## 3. Color system

The primary navy was sampled from the dominant flat color shared by both supplied images. Other colors are proposed supporting tokens.

| Name | HEX | RGB | Role |
|---|---|---|---|
| LIOCER Navy | #092B5B | 9, 43, 91 | Primary identity, headlines, buttons, dark sections |
| Deep Navy | #061C3B | 6, 28, 59 | Rich dark backgrounds and tonal depth |
| White | #FFFFFF | 255, 255, 255 | Main canvas, reverse text and logo |
| Ice | #F3F6FA | 243, 246, 250 | Secondary canvas and quiet panels |
| Slate | #52647A | 82, 100, 122 | Supporting body copy and labels on light surfaces |
| Line | #D7E0EB | 215, 224, 235 | Decorative dividers and subtle panel borders |
| Ribbon Blue | #7396C4 | 115, 150, 196 | Artwork highlights and restrained accents |

Suggested overall balance: approximately 65% white/Ice, 25% navy/deep navy and 10% supporting shades. Treat this as a composition guide, not a quota for every page.

Primary pairings: white text on navy; navy text on white or Ice; Slate body text on white. Ribbon Blue is decorative, not a small-text color on white. Use Slate or navy for essential form boundaries; Line is intended for nonessential dividers. Status colors belong to product interfaces and should be reserved for meaningful status feedback.

For print, convert the digital palette with the printer's intended ICC profile and approve a proof. HEX is the digital source of truth.

## 4. Typography

| Role | Typeface | Weight | Guidance |
|---|---|---|---|
| Display and headings | Manrope | 600–700 | Strong geometric forms, short lines, sentence case |
| Body | Inter | 400 | Comfortable reading and clear hierarchy |
| Navigation and controls | Inter | 500–600 | Compact and legible |
| Supporting labels | Inter | 500 | Use uppercase sparingly with slightly wider tracking |

| Style | Desktop | Mobile | Line height | Tracking |
|---|---|---|---|---|
| Hero | 72 px | 40 px | 1.05–1.10 | -0.035em |
| Section heading | 48 px | 32 px | 1.12 | -0.025em |
| Subheading | 28 px | 24 px | 1.20 | -0.015em |
| Lead paragraph | 20 px | 18 px | 1.55 | Normal |
| Body | 16–18 px | 16 px | 1.60 | Normal |
| Navigation/buttons | 14–16 px | 14–16 px | 1.30 | Normal |
| Labels/captions | 12–14 px | 12–14 px | 1.45 | 0.08em for uppercase only |

Use fluid sizing between breakpoints. Keep body lines around 55–75 characters. Use 600 for most headings and reserve 700 for emphasis. The supplied logo wordmark is artwork, not Manrope.

Official font sources:

- Manrope: https://github.com/google/fonts/tree/main/ofl/manrope
- Inter: https://rsms.me/inter/

Retain the accompanying font licenses when distributing font files. Self-host the required font weights in production and use a system sans-serif fallback.

## 5. Artwork system

### A. Sculptural ribbons — signature hero artwork

Broad folded bands with continuous movement and deliberate negative space. Use matte pearl, satin navy and restrained cool-blue edge lighting. Keep the composition simple and give text its own quiet area. This artwork extends the ribbon language without replacing the logo.

Use for homepage heroes, company announcements, campaign covers and presentation openings. Choose one strong composition per surface.

### B. Flow lines — quiet supporting graphics

Use a small set of smooth parallel curves, a single direction of travel and a generous surrounding field. Use navy at 4–8% opacity on white, or white at 6–10% on navy. These are background graphics rather than foreground content.

Use for section transitions, document covers and subtle editorial backgrounds.

### C. Product views — evidence and clarity

Use crisp, approved interface captures framed in simple white or navy panels. Maintain readable labels. Show a focused task or workflow rather than a wall of tiny UI. Label illustrative interfaces as concepts while the product is in development.

Use for SaaS product pages, feature explanations and release communications.

### D. Photography — people and work

Use authentic photographs of teams, practitioners and working environments with natural light and restrained grading. Give subjects room and connect the photo to the accompanying story.

### Composition rules

- Keep text outside complex ribbon highlights.
- Use wide 16:9 artwork for desktop; compose a separate portrait crop for mobile so the subject and copy remain clear.
- Keep logo placements separate from decorative cropping.
- Use a restrained palette and gentle lighting; avoid neon, rainbow gradients, generic robot imagery, decorative code walls and unrelated circuit graphics.
- Preserve the artwork's proportions. A background image may crop within its frame; an identifying logo may not.

### Reusable artwork prompt

Premium abstract architectural ribbon sculpture, deep navy #092B5B, matte pearl white and satin navy folded bands, a single graceful twist, restrained cool-blue edge light, continuous flowing movement and deliberate negative space. Wide composition with a calm left field for live website copy and the sculpture on the right. Soft studio lighting, refined material detail. No text, letters, logos, watermark, UI, circuitry or additional colors. The artwork is decorative, not a replacement logo.

The sample ribbon artwork was created with the built-in image generator using this direction. It is a creative visual; the palette table defines exact digital colors.

## 6. Website design system

- Desktop content width: maximum 1200 px, with 48–64 px outer gutters where space allows.
- Mobile gutters: 20–24 px. Collapse to one column while preserving the order of the content.
- Section spacing: 104–144 px desktop; 64–80 px mobile.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96 and 128 px.
- Buttons: minimum height 48 px; 8 px corner radius; 20–24 px horizontal padding.
- Primary button: navy on white surfaces; white with navy text on dark surfaces.
- Secondary button: transparent with a clearly visible border and text.
- Panels: 16–20 px corner radius, restrained shadow or a subtle border. Use panels selectively.
- Icons: consistent simple line icons at 20–24 px, approximately 1.75–2 px stroke. Keep icon style consistent across the site.
- Motion: 180–240 ms for control feedback, 400–600 ms for gentle section reveals. Respect reduced-motion preferences.
- Keep keyboard focus visible. Use at least 4.5:1 contrast for normal text, 3:1 for large text, and 3:1 for essential control boundaries and state indicators.
- Use live HTML text over artwork; keep navigation and calls to action outside busy image areas.

Homepage treatment: white navigation; spacious navy hero with the ribbon artwork; open white content sections; a substantial KLEX product feature; restrained service panels; a navy closing invitation.

## 7. Product architecture — KLEX

Company: **LIOCER**

Product: **KLEX**

Descriptor: **Legal matter management**

Endorsement: **by LIOCER**

KLEX is the new name for the legal matter management product. LIOCER remains a software engineering company with SaaS products and custom software services.

At this stage use a typographic product signature: KLEX in Manrope 700, with the descriptor in Inter and a smaller “by LIOCER” endorsement. This is a proposed product treatment, not a replacement for the supplied LIOCER logo.

Use the shared navy-and-white system. Differentiate KLEX through matter-related interface views, focused editorial copy and product imagery. A separate product symbol or additional product color can be developed later.

Website route: **/products/klex**

Enquiry parameter: **interest=klex**

Public status remains **In development** until release status changes.

## 8. Brand voice

Use direct, composed language. Explain the work, the benefit and the next step. Prefer specific descriptions to superlatives.

Hero example: **Software built for the way you work.**

Supporting copy: We build SaaS products and custom applications that help businesses organize operations, connect systems and get work done.

KLEX example: **Keep every matter moving.**

Supporting copy: Legal matter management designed to connect the people, deadlines, documents and responsibilities around your work.

## 9. Implementation tokens

```css
:root {
  --brand-navy: #092b5b;
  --brand-deep: #061c3b;
  --surface: #ffffff;
  --surface-soft: #f3f6fa;
  --text-primary: #092b5b;
  --text-secondary: #52647a;
  --line-subtle: #d7e0eb;
  --art-accent: #7396c4;
  --font-heading: 'Manrope', sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --radius-button: 8px;
  --radius-panel: 20px;
  --content-max: 1200px;
}
```

## Reference standards

- Text contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Essential interface contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
