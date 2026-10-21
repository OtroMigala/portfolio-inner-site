// @ts-check
// Contentful Delivery API client, used at build time only (spec 03, D2).
// No SDK: one GET per locale is all the sites need.

const { fromDelivery } = require('./mapping');

/** @typedef {import('../../../content/types').PortfolioContent} PortfolioContent */
/** @typedef {'es' | 'en'} Locale */

/**
 * @typedef {object} ContentfulConfig
 * @property {string | undefined} spaceId
 * @property {string} environment
 * @property {string | undefined} deliveryToken
 * @property {string | undefined} managementToken
 * @property {string} host
 * @property {Record<Locale, string>} locales Contentful locale code for each app locale
 * @property {Locale} defaultLocale app locale mapped to the space's default locale
 */

/** @returns {ContentfulConfig} */
function contentfulConfig(env = process.env) {
    return {
        spaceId: env.CONTENTFUL_SPACE_ID,
        environment: env.CONTENTFUL_ENVIRONMENT || 'master',
        deliveryToken: env.CONTENTFUL_DELIVERY_TOKEN,
        managementToken: env.CONTENTFUL_MANAGEMENT_TOKEN,
        host: env.CONTENTFUL_HOST || 'cdn.contentful.com',
        // A new Contentful space starts with en-US as its default locale; the
        // setup script adds es with en-US as fallback.
        locales: { es: env.CONTENTFUL_LOCALE_ES || 'es', en: env.CONTENTFUL_LOCALE_EN || 'en-US' },
        defaultLocale: /** @type {Locale} */ (env.CONTENTFUL_DEFAULT_LOCALE || 'en'),
    };
}

/** @param {ContentfulConfig} cfg */
const isDeliveryConfigured = (cfg) => !!(cfg.spaceId && cfg.deliveryToken);

/**
 * @param {ContentfulConfig} cfg
 * @param {Locale} locale
 * @param {typeof fetch} [fetchImpl]
 * @returns {Promise<PortfolioContent>}
 */
async function fetchLocale(cfg, locale, fetchImpl = fetch) {
    const params = new URLSearchParams({
        content_type: 'profile',
        include: '4',
        limit: '1',
        locale: cfg.locales[locale],
    });
    const url = `https://${cfg.host}/spaces/${cfg.spaceId}/environments/${cfg.environment}/entries?${params}`;
    const response = await fetchImpl(url, { headers: { Authorization: `Bearer ${cfg.deliveryToken}` } });
    if (!response.ok) throw new Error(`Contentful Delivery API: HTTP ${response.status} for locale ${cfg.locales[locale]}`);
    return fromDelivery(await response.json(), locale);
}

module.exports = { contentfulConfig, isDeliveryConfigured, fetchLocale };
