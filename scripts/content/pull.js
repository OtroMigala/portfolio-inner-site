// @ts-check
// `npm run content:pull` — fetches the published content from Contentful,
// validates it, and writes it to content/snapshot/{es,en}.json. The snapshot is
// what builds use when the CMS is not configured or not reachable, so pulling
// and committing it keeps that fallback current.

const fs = require('fs');
const path = require('path');
const { getContentSource, localSource, loadFrom, SNAPSHOT_DIR, LOCALES } = require('./sources');

(async () => {
    const source = getContentSource();
    if (source === localSource) {
        console.error('Set CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN to pull from Contentful.');
        process.exit(1);
    }
    const content = await loadFrom(source); // no fallback here: a failed pull must fail
    for (const locale of LOCALES) {
        const file = path.join(process.argv[2] || SNAPSHOT_DIR, `${locale}.json`);
        fs.writeFileSync(file, JSON.stringify(content[locale], null, 4) + '\n');
        console.log(`wrote ${path.relative(process.cwd(), file)} from ${source.name}`);
    }
})().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
