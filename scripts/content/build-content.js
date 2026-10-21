// @ts-check
// Runs before `npm start` / `npm run build` (prestart / prebuild).
// Loads the content (Contentful if configured, else the committed snapshot,
// see sources.js) and writes it to src/content/generated/, which the app
// imports. Create React App cannot import files outside src/.
// This file only exists in the inner site; the rest of scripts/content is a
// copy of portfolio-website/bundler/content (npm run content:sync-inner there).

const fs = require('fs');
const path = require('path');
const { loadAllLocales, LOCALES } = require('./sources');

const OUT = path.resolve(__dirname, '../../src/content/generated');

loadAllLocales()
    .then((content) => {
        fs.mkdirSync(OUT, { recursive: true });
        for (const locale of LOCALES) {
            fs.writeFileSync(path.join(OUT, `${locale}.json`), JSON.stringify(content[locale]));
        }
        console.log(`[content] wrote src/content/generated/{${LOCALES.join(',')}}.json`);
    })
    .catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
