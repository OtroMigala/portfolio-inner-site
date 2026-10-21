// @ts-check
// Fails the build when content does not match the model in content/types.ts.
// The locales must also be structurally identical (same ids, same order), so a
// translation can never silently drop an entry.

/** @typedef {import('../../content/types').PortfolioContent} PortfolioContent */

const LINK_KINDS = ['github', 'linkedin', 'instagram', 'website', 'repository'];
const CATEGORY_IDS = ['software', 'aerospace'];
const DATE_RE = /^\d{4}(-\d{2})?$/;

/**
 * Every media URL with its location, e.g. "experience.ezlife.logo=asset:...".
 * @param {any} value @param {string} [at]
 * @returns {string[]}
 */
function mediaUrls(value, at = '') {
    if (Array.isArray(value)) return value.flatMap((v, i) => mediaUrls(v, `${at}[${v && v.id ? v.id : i}]`));
    if (!value || typeof value !== 'object') return [];
    if (typeof value.url === 'string' && typeof value.alt === 'string') return [`${at}=${value.url}`];
    return Object.entries(value).flatMap(([k, v]) => mediaUrls(v, `${at}.${k}`));
}

/**
 * @param {Record<string, PortfolioContent>} byLocale
 */
function validateContent(byLocale) {
    /** @type {string[]} */
    const errors = [];
    const err = (/** @type {string} */ msg) => errors.push(msg);

    const str = (/** @type {unknown} */ v, /** @type {string} */ at, optional = false) => {
        if (v === undefined && optional) return;
        if (typeof v !== 'string' || v.trim() === '') err(`${at}: expected non-empty string`);
    };
    const strArr = (/** @type {unknown} */ v, /** @type {string} */ at) => {
        if (!Array.isArray(v)) return err(`${at}: expected array`);
        v.forEach((s, i) => str(s, `${at}[${i}]`));
    };
    const link = (/** @type {any} */ l, /** @type {string} */ at) => {
        str(l && l.label, `${at}.label`);
        str(l && l.url, `${at}.url`);
        if (!l || !LINK_KINDS.includes(l.kind)) err(`${at}.kind: expected one of ${LINK_KINDS.join(', ')}`);
    };
    const media = (/** @type {any} */ m, /** @type {string} */ at) => {
        str(m && m.url, `${at}.url`);
        if (m && typeof m.url === 'string' && !/^(asset:|https:\/\/)/.test(m.url)) err(`${at}.url: expected asset:<path> or https://`);
        if (!m || typeof m.alt !== 'string') err(`${at}.alt: required (use "" only for decorative images)`);
        str(m && m.caption, `${at}.caption`, true);
    };
    const date = (/** @type {unknown} */ v, /** @type {string} */ at) => {
        if (v === undefined || v === null) return;
        if (typeof v !== 'string' || !DATE_RE.test(v)) err(`${at}: expected YYYY or YYYY-MM`);
    };

    for (const [locale, c] of Object.entries(byLocale)) {
        const at = locale;
        if (c.locale !== locale) err(`${at}.locale: expected "${locale}"`);

        const p = c.profile || /** @type {any} */ ({});
        ['fullName', 'firstName', 'lastName', 'role', 'tagline', 'location'].forEach((k) =>
            str(/** @type {any} */ (p)[k], `${at}.profile.${k}`)
        );
        strArr(p.summary, `${at}.profile.summary`);
        strArr(p.closing, `${at}.profile.closing`);
        if (p.portrait) media(p.portrait, `${at}.profile.portrait`);
        if (p.resume) media(p.resume, `${at}.profile.resume`);

        (c.about || []).forEach((s, i) => {
            str(s.id, `${at}.about[${i}].id`);
            str(s.heading, `${at}.about[${i}].heading`);
            strArr(s.body, `${at}.about[${i}].body`);
            if (s.logo) media(s.logo, `${at}.about[${i}].logo`);
            if (s.image) media(s.image, `${at}.about[${i}].image`);
            if (s.imageAfter !== undefined && !(Number.isInteger(s.imageAfter) && s.imageAfter >= 0)) err(`${at}.about[${i}].imageAfter: expected a non-negative integer`);
        });

        (c.experience || []).forEach((e, i) => {
            const ea = `${at}.experience[${i}]`;
            ['id', 'organization', 'role'].forEach((k) => str(/** @type {any} */ (e)[k], `${ea}.${k}`));
            date(e.start, `${ea}.start`);
            date(e.end, `${ea}.end`);
            if (!e.start && !e.dateLabel) err(`${ea}: needs start or dateLabel`);
            str(e.summary, `${ea}.summary`, true);
            strArr(e.highlights, `${ea}.highlights`);
            if (e.website) link(e.website, `${ea}.website`);
            if (e.logo) media(e.logo, `${ea}.logo`);
            (e.images || []).forEach((m, j) => media(m, `${ea}.images[${j}]`));
        });

        (c.projectCategories || []).forEach((cat, i) => {
            const ca = `${at}.projectCategories[${i}]`;
            if (!CATEGORY_IDS.includes(cat.id)) err(`${ca}.id: expected one of ${CATEGORY_IDS.join(', ')}`);
            ['title', 'subtitle', 'intro'].forEach((k) => str(/** @type {any} */ (cat)[k], `${ca}.${k}`));
            if (cat.icon) media(cat.icon, `${ca}.icon`);
            if (cat.logo) media(cat.logo, `${ca}.logo`);
            (cat.projects || []).forEach((pr, j) => {
                const pa = `${ca}.projects[${j}]`;
                str(pr.id, `${pa}.id`);
                str(pr.title, `${pa}.title`);
                str(pr.context, `${pa}.context`, true);
                strArr(pr.description, `${pa}.description`);
                strArr(pr.highlights, `${pa}.highlights`);
                (pr.links || []).forEach((l, k) => link(l, `${pa}.links[${k}]`));
                if (pr.logo) media(pr.logo, `${pa}.logo`);
                (pr.images || []).forEach((m, k) => media(m, `${pa}.images[${k}]`));
            });
        });

        (c.awards || []).forEach((a, i) => {
            str(a.id, `${at}.awards[${i}].id`);
            str(a.text, `${at}.awards[${i}].text`);
        });
        (c.languages || []).forEach((l, i) => {
            str(l.language, `${at}.languages[${i}].language`);
            str(l.level, `${at}.languages[${i}].level`);
        });

        const ct = c.contact || /** @type {any} */ ({});
        ['intro', 'email', 'phoneDisplay', 'whatsappUrl'].forEach((k) => str(/** @type {any} */ (ct)[k], `${at}.contact.${k}`));
        (ct.links || []).forEach((l, i) => link(l, `${at}.contact.links[${i}]`));
    }

    // Structural parity between locales.
    const shape = (/** @type {PortfolioContent} */ c) =>
        JSON.stringify({
            about: (c.about || []).map((s) => s.id),
            experience: (c.experience || []).map((e) => [e.id, e.start, e.end, (e.highlights || []).length]),
            projects: (c.projectCategories || []).map((cat) => [cat.id, (cat.projects || []).map((p) => [p.id, (p.links || []).length])]),
            awards: (c.awards || []).map((a) => a.id),
            languages: (c.languages || []).length,
            links: (c.contact && c.contact.links ? c.contact.links : []).map((l) => l.url),
            // Same images, in the same places, in every locale (alt and caption are translated).
            media: mediaUrls(c),
        });
    const [first, ...rest] = Object.values(byLocale);
    rest.forEach((c) => {
        if (shape(c) !== shape(first)) err(`${c.locale}: structure differs from ${first.locale} (ids, order or list lengths)`);
    });

    if (errors.length) {
        throw new Error(`Invalid content:\n  - ${errors.join('\n  - ')}`);
    }
}

module.exports = { validateContent };
