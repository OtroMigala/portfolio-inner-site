// @ts-check
// Content sources used at build time. Every source returns the same
// `PortfolioContent` shape (see content/types.ts), so swapping the provider
// never touches the renderers.

const fs = require('fs');
const path = require('path');
const { validateContent } = require('./validate');
const { contentfulConfig, isDeliveryConfigured, fetchLocale } = require('./contentful/delivery');

/** @typedef {import('../../content/types').PortfolioContent} PortfolioContent */
/** @typedef {import('../../content/types').Locale} Locale */

/**
 * @typedef {object} ContentSource
 * @property {string} name
 * @property {(locale: Locale) => Promise<PortfolioContent>} load
 */

const SNAPSHOT_DIR = path.resolve(__dirname, '../../content/snapshot');
/** @type {Locale[]} */
const LOCALES = ['es', 'en'];

/** Reads the committed snapshot. Works offline and without credentials. @type {ContentSource} */
const localSource = {
    name: 'local-snapshot',
    /** @param {Locale} locale */
    async load(locale) {
        const file = path.join(SNAPSHOT_DIR, `${locale}.json`);
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    },
};

/**
 * Contentful when its credentials are set (CONTENTFUL_SPACE_ID and
 * CONTENTFUL_DELIVERY_TOKEN), the local snapshot otherwise.
 * @returns {ContentSource}
 */
function getContentSource(env = process.env, fetchImpl = globalThis.fetch) {
    const cfg = contentfulConfig(env);
    if (!isDeliveryConfigured(cfg)) return localSource;
    return {
        name: `contentful:${cfg.spaceId}/${cfg.environment}`,
        /** @param {Locale} locale */
        load: (locale) => fetchLocale(cfg, locale, fetchImpl),
    };
}

/**
 * Loads and validates every locale from one source.
 * @param {ContentSource} source
 * @returns {Promise<Record<Locale, PortfolioContent>>}
 */
async function loadFrom(source) {
    const entries = await Promise.all(LOCALES.map(async (locale) => /** @type {const} */ ([locale, await source.load(locale)])));
    const byLocale = /** @type {Record<Locale, PortfolioContent>} */ (Object.fromEntries(entries));
    validateContent(byLocale);
    return byLocale;
}

/**
 * Loads every locale. If the CMS fails (network, auth, invalid content) the
 * build falls back to the committed snapshot instead of failing.
 * @param {ContentSource} [source]
 * @param {(message: string) => void} [log]
 * @returns {Promise<Record<Locale, PortfolioContent>>}
 */
async function loadAllLocales(source = getContentSource(), log = (m) => console.log(m)) {
    if (source === localSource) {
        log('[content] source: local snapshot (no Contentful credentials)');
        return loadFrom(localSource);
    }
    try {
        const content = await loadFrom(source);
        log(`[content] source: ${source.name}`);
        return content;
    } catch (error) {
        log(`[content] ${source.name} failed, using the local snapshot: ${/** @type {Error} */ (error).message}`);
        return loadFrom(localSource);
    }
}

module.exports = { localSource, getContentSource, loadAllLocales, loadFrom, SNAPSHOT_DIR, LOCALES };
