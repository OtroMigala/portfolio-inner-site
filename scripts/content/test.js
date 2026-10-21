// @ts-check
// `npm run content:test` — checks the Contentful integration without a space.
// CM1: snapshot -> Contentful entries -> simulated Delivery response ->
//      PortfolioContent must equal the snapshot.
// CM3: a failing CMS falls back to the snapshot instead of failing the build.
// CM2: without credentials the local snapshot is used.

const assert = require('assert');
const { toContentful, fromDelivery } = require('./contentful/mapping');
const { contentfulConfig } = require('./contentful/delivery');
const { localSource, getContentSource, loadAllLocales } = require('./sources');
const { validateContent } = require('./validate');

/** @typedef {'es' | 'en'} Locale */

const ASSET_HOST = '//assets.test/';

/** Deep copy with object keys sorted, so key order does not matter. */
const canonical = (/** @type {any} */ v) => JSON.parse(JSON.stringify(v, (_k, x) => (x && typeof x === 'object' && !Array.isArray(x) ? Object.fromEntries(Object.keys(x).sort().map((k) => [k, x[k]])) : x)));

/**
 * What the Delivery API returns for `locale`: every field resolved to that
 * locale, falling back to the default locale (as Contentful does for
 * non-localized fields and for es -> en-US).
 */
function simulateDelivery(/** @type {ReturnType<typeof toContentful>} */ space, /** @type {Record<Locale, string>} */ codes, /** @type {Locale} */ locale, /** @type {Locale} */ defaultLocale) {
    const resolve = (/** @type {Record<string, any>} */ fields) =>
        Object.fromEntries(
            Object.entries(fields)
                .map(([k, v]) => [k, v[codes[locale]] !== undefined ? v[codes[locale]] : v[codes[defaultLocale]]])
                .filter(([, v]) => v !== undefined)
        );
    const entries = space.entries.map((e) => ({ sys: { id: e.id, contentType: { sys: { id: e.contentType } } }, fields: resolve(e.fields) }));
    const assets = space.assets.map((a) => ({
        sys: { id: a.id },
        fields: { ...resolve(a.fields), file: { url: ASSET_HOST + a.path, details: {} } },
    }));
    return {
        items: entries.filter((e) => e.sys.id === 'profile'),
        includes: { Entry: entries.filter((e) => e.sys.id !== 'profile'), Asset: assets },
    };
}

(async () => {
    /** @type {string[]} */
    const results = [];
    const check = async (/** @type {string} */ name, /** @type {() => Promise<void> | void} */ fn) => {
        try {
            await fn();
            results.push(`PASS ${name}`);
        } catch (error) {
            results.push(`FAIL ${name}: ${/** @type {Error} */ (error).message}`);
        }
    };

    const snapshot = {
        es: await localSource.load('es'),
        en: await localSource.load('en'),
    };
    validateContent(snapshot);
    const cfg = contentfulConfig({});

    await check('CM1 round trip snapshot -> Contentful -> snapshot (es, en)', () => {
        const space = toContentful(snapshot, cfg.locales, cfg.defaultLocale);
        for (const locale of /** @type {Locale[]} */ (['es', 'en'])) {
            const back = fromDelivery(simulateDelivery(space, cfg.locales, locale, cfg.defaultLocale), locale);
            // Media come back as CMS URLs; map them to the asset: paths they were uploaded from.
            const restored = JSON.parse(JSON.stringify(back).split('"https:' + ASSET_HOST).join('"asset:'));
            assert.deepStrictEqual(canonical(restored), canonical(snapshot[locale]));
        }
        assert.ok(space.entries.length > 0 && space.assets.length > 0);
        results.push(`     ${space.entries.length} entries, ${space.assets.length} assets`);
    });

    await check('CM2 no credentials -> local snapshot', () => {
        assert.strictEqual(getContentSource({}), localSource);
    });

    await check('CM3 CMS unreachable -> falls back to the snapshot', async () => {
        const failingFetch = /** @type {typeof fetch} */ (/** @type {unknown} */ (async () => {
            throw new Error('getaddrinfo ENOTFOUND cdn.contentful.com');
        }));
        const source = getContentSource({ CONTENTFUL_SPACE_ID: 'x', CONTENTFUL_DELIVERY_TOKEN: 'y' }, failingFetch);
        /** @type {string[]} */
        const logs = [];
        const content = await loadAllLocales(source, (m) => logs.push(m));
        assert.deepStrictEqual(content.es, snapshot.es);
        assert.ok(logs.some((l) => l.includes('failed, using the local snapshot')));
    });

    await check('CM3 CMS returns invalid content -> falls back to the snapshot', async () => {
        const badFetch = /** @type {typeof fetch} */ (/** @type {unknown} */ (async () => ({ ok: true, json: async () => ({ items: [] }) })));
        const source = getContentSource({ CONTENTFUL_SPACE_ID: 'x', CONTENTFUL_DELIVERY_TOKEN: 'y' }, badFetch);
        /** @type {string[]} */
        const logs = [];
        const content = await loadAllLocales(source, (m) => logs.push(m));
        assert.deepStrictEqual(content.en, snapshot.en);
        assert.ok(logs.some((l) => l.includes('no published profile entry')));
    });

    console.log(results.join('\n'));
    if (results.some((r) => r.startsWith('FAIL'))) process.exit(1);
})();
