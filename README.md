# JACUSys

A Windows 95-style site with the portfolio of Juan Alejandro Cárdenas: about, experience, projects and contact, plus a few DOS games. It runs inside the monitor of the 3D scene ([portfolio-websit](https://github.com/OtroMigala/portfolio-websit)) and also works on its own.

**Live:** https://otromigala.github.io/portfolio-inner-site/ · inside the 3D scene: https://otromigala.github.io/portfolio-websit/

Audits, specs and the before/after numbers for both sites live in the 3D site's repository: [`docs/audits/01-after.md`](https://github.com/OtroMigala/portfolio-websit/blob/main/docs/audits/01-after.md). In short:

- **Keyboard:** the desktop, windows, taskbar and form are operable with a keyboard.
- **Accessibility:** 0 axe violations on the desktop and 6 pages; Lighthouse Accessibility 87 → 100.
- **Performance:** js-dos loads only when a game opens (mobile LCP 4.0 → 3.2 s).
- **Content:** comes from a content model in Spanish and English, with a language toggle in the taskbar.

## Stack

React 17, TypeScript, Create React App 5, react-router 6, framer-motion. js-dos 7 for the DOS games. Content from Contentful at build time, with a committed snapshot as fallback.

## Run it

Requires Node 20.

```bash
npm install
npm start              # http://localhost:3000/portfolio-inner-site/
npm run build          # production build in build/
```

`prestart` and `prebuild` generate `src/content/generated/{es,en}.json`. The source is Contentful when `CONTENTFUL_SPACE_ID` and `CONTENTFUL_DELIVERY_TOKEN` are set, and `content/snapshot/` otherwise.

The content module and the snapshot are copied from the 3D site's repository with `npm run content:sync-inner` (run there). Edit the content there or in Contentful, not here. Details: [CMS content model](https://github.com/OtroMigala/portfolio-websit/blob/main/docs/CMS-CONTENT-MODEL.md).

```bash
npm run content:test   # content and Contentful mapping tests
```

**Language:** Spanish by default. `?lang=en` selects English. Inside the 3D scene, the language follows the parent page through `postMessage`, accepted only from the 3D site's origin (and `localhost` during development).

**Deploy:** every push to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`). The base path comes from `homepage` in `package.json`.

## Credits and license

Adapted from [portfolio-inner-site](https://github.com/henryjeff/portfolio-inner-site) by [Henry Heffernan](https://henryheffernan.com/). The games (DOOM, The Oregon Trail, Scrabble, Henordle) come from the original project.

The original repository has no license file, so permission for its code is still pending. [`LICENSE.md`](LICENSE.md) covers my changes. Every third-party asset and its license status is listed in [`CREDITS.md`](CREDITS.md), including js-dos (GPL-2.0) and the items still pending verification.
