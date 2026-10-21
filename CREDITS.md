# Credits and licenses

This portfolio has two repositories: [`portfolio-website`](https://github.com/OtroMigala/portfolio-websit) (the 3D scene) and [`portfolio-inner-site`](https://github.com/OtroMigala/portfolio-inner-site) (JACUSys, shown on the monitor). Both are adaptations of Henry Heffernan's open-source portfolio. This file is identical in both repositories.

**Status legend:** ✅ license verified · ⚠️ **pending verification**. A pending item is used as it came in the original project, by the owner's decision, until its terms are confirmed. Pending items are listed here so they are visible, not hidden.

## Code

| What | Author | License | Status |
| --- | --- | --- | --- |
| Original 3D site ([henryjeff/portfolio-website](https://github.com/henryjeff/portfolio-website)) | Henry Heffernan | MIT (`LICENSE.md`, added by the author in 2024) | ✅ |
| Original inner site ([henryjeff/portfolio-inner-site](https://github.com/henryjeff/portfolio-inner-site)) | Henry Heffernan | **No license file.** None was ever added in the original repository's 118 commits. Without one, no reuse rights are granted by default. The MIT notice in the inner site's `LICENSE.md` can only cover the owner's own changes. Explicit permission or a license from the author is pending | ⚠️ |
| Changes in this adaptation | Juan Alejandro Cárdenas Urbano | MIT | ✅ |
| three.js 0.137.5, React 17.0.2, framer-motion, @tweenjs/tween.js, bezier-easing, react-router-dom, usehooks-ts, stats.js and lil-gui (debug only) | their authors | MIT (from each `package.json`) | ✅ |
| web-vitals 2.1.4 (inner site, Create React App default) | Google | Apache-2.0 | ✅ |
| js-dos 7.3.9 and emulators-ui 0.73.1, shipped unmodified in the inner site's `public/js-dos/` | Alexander Guryanov and contributors (DOSBox) | **GPL-2.0**: redistributed unmodified; source at [github.com/caiiiycuk/js-dos](https://github.com/caiiiycuk/js-dos) | ✅ |
| GSAP 3 and camera-controls 1.38.2 | GreenSock; Yomotsu | Standard "no charge" license; MIT. Listed in `package.json` but **not used**: nothing in `src/` imports them, so they are not shipped | ✅ (not shipped) |
| Build and audit tools: sharp, Lighthouse, Playwright, axe-core, pngjs, fontkit | their authors | Apache-2.0, Apache-2.0, Apache-2.0, MPL-2.0, MIT, MIT | ✅ (not shipped) |

## 3D scene assets (`portfolio-website/static/`)

| What | Author / source | License | Status |
| --- | --- | --- | --- |
| Computer model | Mickael Boitte (credited in the original project) | not stated | ⚠️ |
| Environment and decor models | Sean Nicolas (credited in the original project) | not stated | ⚠️ |
| Baked textures, composition, UVs | Henry Heffernan | Distributed in the MIT-licensed original repository | ✅ |
| 1024² far-level texture copies (`*.lod1024.jpg`) | Derived from the textures above by `scripts/make-texture-lods.js` | Same as the originals | ✅ |
| Monitor layers (smudges, shadow) and static-noise videos | Original project | Distributed in the MIT-licensed original repository; original source not stated | ⚠️ |
| Keyboard, mouse and typing sounds; mixing and foley | Henry Heffernan (credited in the original project) | Distributed in the MIT-licensed original repository | ✅ |
| Office ambience | "Sound Cassette" (credited in the original project) | not stated | ⚠️ |
| Windows 95 startup sound | © Microsoft | no license granted | ⚠️ |
| VT323 font, loaded from Google Fonts | Peter Hull, The VT323 Project Authors | SIL Open Font License 1.1 ([Google Fonts metadata](https://github.com/google/fonts/blob/main/ofl/vt323/METADATA.pb)) | ✅ |
| UI icons (camera, mouse, volume) | Original project | Distributed in the MIT-licensed original repository | ✅ |

## Inner site assets (`portfolio-inner-site`)

| What | Author / source | License | Status |
| --- | --- | --- | --- |
| Photos of the author, teams and projects | Juan Alejandro Cárdenas Urbano | Owner's own | ✅ |
| Résumé (PDF) | Juan Alejandro Cárdenas Urbano | Owner's own | ✅ |
| Organization logos (IEEE AESS, NASA Space Apps, ISIF, EzLife, CIMDOL, TULCAN-SAT) | Their owners | Trademarks, used only to identify organizations the author worked with | ✅ (nominative use) |
| Windows 95-style icons | Original project | Original source not stated | ⚠️ |
| MS Sans Serif font (`MSSansSerif.ttf`) | © Microsoft | no license granted | ⚠️ |
| Millennium, Millennium Bold, Terminal fonts | Original project | not stated | ⚠️ |
| Adobe Fonts kit `llo2eru` (headings) | Adobe Fonts kit from the original project | Adobe Fonts licenses are tied to the subscriber's account; this kit was not created by the owner | ⚠️ |
| DOOM (shareware episode, `doom.jsdos`) | id Software | Shareware distribution terms not confirmed for this use | ⚠️ |
| The Oregon Trail (`trail.jsdos`) | MECC | no license granted | ⚠️ |
| Scrabble (`scrabble.jsdos`) | its rights holders | no license granted | ⚠️ |
| Digger (`digger.jsdos`, present but not linked on the desktop) | Windmill Software | not stated | ⚠️ |
| Henordle (Wordle-style game) | Henry Heffernan | Code from the original project | ✅ |

## Inspiration

Henry Heffernan, Bruno Simon, Jesse Zhou, Pink Yellow (as credited in the original project).

## Resolving the pending items

For each ⚠️ item, either find and record its license here, or replace it with a licensed alternative. The most important one is the original inner site's code: ask Henry Heffernan for permission or for a license. VT323 or another OFL font could replace the Microsoft and unknown fonts, a self-made or CC0 sound could replace the Windows 95 chime, and the DOS games could be removed or swapped for open titles.
