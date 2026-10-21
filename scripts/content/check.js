// @ts-check
// `npm run content:check` — validates the content of the active source.
const { getContentSource, loadAllLocales } = require('./sources');

const source = getContentSource();
loadAllLocales(source)
    .then((byLocale) => {
        const counts = Object.values(byLocale).map(
            (c) => `${c.locale}: ${c.experience.length} experience, ${c.projectCategories.reduce((n, cat) => n + cat.projects.length, 0)} projects`
        );
        console.log(`content ok (${source.name}) — ${counts.join('; ')}`);
    })
    .catch((e) => {
        console.error(e.message);
        process.exit(1);
    });
