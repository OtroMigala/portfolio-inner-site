// @ts-check
// Maps between the portfolio content model (content/types.ts) and Contentful.
// - toContentful(): snapshot (both locales) -> entries and assets with
//   localized fields, for the seed script.
// - fromDelivery(): one Delivery API response (single locale) -> one
//   PortfolioContent, for builds.
// Both directions live together so a round trip can be tested without a
// Contentful space (bundler/content/test.js).

/** @typedef {import('../../../content/types').PortfolioContent} PortfolioContent */
/** @typedef {import('../../../content/types').Media} Media */
/** @typedef {import('../../../content/types').Link} Link */
/** @typedef {'es' | 'en'} Locale */

const PARAGRAPHS = /\n\s*\n/;
const joinParagraphs = (/** @type {string[]} */ p) => p.join('\n\n');
const joinLines = (/** @type {string[]} */ l) => l.join('\n');
const splitParagraphs = (/** @type {string | undefined} */ t) => (t ? t.split(PARAGRAPHS).map((s) => s.trim()).filter(Boolean) : []);
const splitLines = (/** @type {string | undefined} */ t) => (t ? t.split('\n').map((s) => s.trim()).filter(Boolean) : []);

/** Contentful ids: letters, digits, - _ . and at most 64 characters. */
const toId = (/** @type {string} */ s) => s.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 64);
const assetId = (/** @type {string} */ url) => toId('asset-' + url.replace(/^asset:/, ''));

const entryLink = (/** @type {string} */ id) => ({ sys: { type: 'Link', linkType: 'Entry', id } });
const assetLink = (/** @type {string} */ id) => ({ sys: { type: 'Link', linkType: 'Asset', id } });

// ---------------------------------------------------------------------------
// Snapshot -> Contentful (seed)
// ---------------------------------------------------------------------------

/**
 * @param {Record<Locale, PortfolioContent>} byLocale
 * @param {Record<Locale, string>} codes Contentful locale code for each app locale
 * @param {Locale} defaultLocale app locale that maps to the space's default locale
 */
function toContentful(byLocale, codes, defaultLocale = 'en') {
    const locales = /** @type {Locale[]} */ (Object.keys(byLocale));
    /** @type {{ id: string, contentType: string, fields: Record<string, any> }[]} */
    const entries = [];
    /** @type {Map<string, { id: string, path: string, fields: Record<string, any> }>} */
    const assets = new Map();

    /** Localized value from a getter applied to each locale's document. */
    const loc = (/** @type {(c: PortfolioContent) => any} */ get) => {
        /** @type {Record<string, any>} */
        const out = {};
        for (const l of locales) {
            const v = get(byLocale[l]);
            if (v !== undefined && v !== null && v !== '') out[codes[l]] = v;
        }
        return Object.keys(out).length ? out : undefined;
    };
    /** Non-localized value: stored in the default locale only. */
    const one = (/** @type {any} */ v) => (v === undefined || v === null ? undefined : { [codes[defaultLocale]]: v });

    /**
     * Registers an asset and returns a link to it. A Contentful asset has one
     * description (the alt text), but the same file can be decorative in one
     * place and meaningful in another (aess.svg: next to the chapter name, and
     * as the aerospace category logo). Decorative uses never set the
     * description; two meaningful uses with different alt text get two assets.
     */
    const media = (/** @type {(c: PortfolioContent) => Media | undefined} */ get, decorative = false) => {
        const first = get(byLocale[locales[0]]);
        if (!first) return undefined;
        const description = decorative ? undefined : loc((c) => get(c)?.alt);
        const base = assetId(first.url);
        let id = base;
        for (let n = 2; ; n++) {
            const existing = assets.get(id);
            if (!existing) {
                assets.set(id, {
                    id,
                    path: first.url.replace(/^asset:/, ''),
                    fields: { title: one(first.url.replace(/^asset:/, '').split('/').pop()), description },
                });
                break;
            }
            if (!description) break;
            if (!existing.fields.description) {
                existing.fields.description = description;
                break;
            }
            if (JSON.stringify(existing.fields.description) === JSON.stringify(description)) break;
            id = toId(`${base}-${n}`);
        }
        return one(assetLink(id));
    };
    const mediaList = (/** @type {(c: PortfolioContent) => Media[]} */ get) => {
        const list = get(byLocale[locales[0]]);
        if (!list.length) return undefined;
        return one(list.map((_, i) => /** @type {Record<string, any>} */ (media((c) => get(c)[i]))[codes[defaultLocale]]));
    };

    /** Creates a link entry and returns its id. */
    const link = (/** @type {string} */ id, /** @type {(c: PortfolioContent) => Link} */ get) => {
        const base = get(byLocale[locales[0]]);
        entries.push({
            id,
            contentType: 'link',
            fields: { label: loc((c) => get(c).label), url: one(base.url), kind: one(base.kind) },
        });
        return id;
    };

    const c0 = byLocale[locales[0]];

    const aboutIds = c0.about.map((s, i) => {
        const id = toId('about-' + s.id);
        const pick = (/** @type {PortfolioContent} */ c) => c.about[i];
        entries.push({
            id,
            contentType: 'aboutSection',
            fields: {
                slug: one(s.id),
                heading: loc((c) => pick(c).heading),
                body: loc((c) => joinParagraphs(pick(c).body)),
                logo: media((c) => pick(c).logo),
                image: media((c) => pick(c).image),
                imageCaption: loc((c) => pick(c).image?.caption),
                imageAfter: one(s.imageAfter),
            },
        });
        return id;
    });

    const experienceIds = c0.experience.map((e, i) => {
        const id = toId('experience-' + e.id);
        const pick = (/** @type {PortfolioContent} */ c) => c.experience[i];
        entries.push({
            id,
            contentType: 'experience',
            fields: {
                slug: one(e.id),
                organization: one(e.organization),
                role: loc((c) => pick(c).role),
                start: one(e.start),
                end: one(e.end || undefined),
                current: e.end === null ? one(true) : undefined,
                dateLabel: loc((c) => pick(c).dateLabel),
                website: e.website ? one(entryLink(link(toId(`link-${id}-website`), (c) => /** @type {Link} */ (pick(c).website)))) : undefined,
                logo: media((c) => pick(c).logo, true),
                summary: loc((c) => pick(c).summary),
                highlights: loc((c) => joinLines(pick(c).highlights)),
                images: mediaList((c) => pick(c).images),
            },
        });
        return id;
    });

    const categoryIds = c0.projectCategories.map((cat, i) => {
        const id = toId('category-' + cat.id);
        const pickCat = (/** @type {PortfolioContent} */ c) => c.projectCategories[i];
        const projectIds = cat.projects.map((p, j) => {
            const pid = toId('project-' + p.id);
            const pick = (/** @type {PortfolioContent} */ c) => pickCat(c).projects[j];
            entries.push({
                id: pid,
                contentType: 'project',
                fields: {
                    slug: one(p.id),
                    title: loc((c) => pick(c).title),
                    context: loc((c) => pick(c).context),
                    description: loc((c) => joinParagraphs(pick(c).description)),
                    highlights: loc((c) => (pick(c).highlights.length ? joinLines(pick(c).highlights) : undefined)),
                    links: p.links.length
                        ? one(p.links.map((_, k) => entryLink(link(toId(`link-${pid}-${k}`), (c) => pick(c).links[k]))))
                        : undefined,
                    logo: media((c) => pick(c).logo),
                    images: mediaList((c) => pick(c).images),
                },
            });
            return pid;
        });
        entries.push({
            id,
            contentType: 'projectCategory',
            fields: {
                slug: one(cat.id),
                title: loc((c) => pickCat(c).title),
                subtitle: loc((c) => pickCat(c).subtitle),
                intro: loc((c) => pickCat(c).intro),
                icon: media((c) => pickCat(c).icon, true),
                logo: media((c) => pickCat(c).logo),
                projects: one(projectIds.map(entryLink)),
            },
        });
        return id;
    });

    const awardIds = c0.awards.map((a, i) => {
        const id = toId('award-' + a.id);
        entries.push({ id, contentType: 'award', fields: { slug: one(a.id), text: loc((c) => c.awards[i].text) } });
        return id;
    });

    const languageIds = c0.languages.map((_, i) => {
        const id = `language-${i}`;
        entries.push({
            id,
            contentType: 'languageSkill',
            fields: { language: loc((c) => c.languages[i].language), level: loc((c) => c.languages[i].level) },
        });
        return id;
    });

    const contactIds = c0.contact.links.map((_, i) => link(`link-contact-${i}`, (c) => c.contact.links[i]));
    const p = c0.profile;
    entries.push({
        id: 'profile',
        contentType: 'profile',
        fields: {
            fullName: one(p.fullName),
            firstName: one(p.firstName),
            lastName: one(p.lastName),
            role: loc((c) => c.profile.role),
            tagline: loc((c) => c.profile.tagline),
            location: one(p.location),
            summary: loc((c) => joinParagraphs(c.profile.summary)),
            closing: loc((c) => joinParagraphs(c.profile.closing)),
            portrait: media((c) => c.profile.portrait),
            portraitCaption: loc((c) => c.profile.portrait?.caption),
            resume: media((c) => c.profile.resume),
            about: one(aboutIds.map(entryLink)),
            experience: one(experienceIds.map(entryLink)),
            projectCategories: one(categoryIds.map(entryLink)),
            awards: one(awardIds.map(entryLink)),
            languages: one(languageIds.map(entryLink)),
            contactIntro: loc((c) => c.contact.intro),
            email: one(c0.contact.email),
            phoneDisplay: one(c0.contact.phoneDisplay),
            whatsappUrl: one(c0.contact.whatsappUrl),
            contactLinks: one(contactIds.map(entryLink)),
        },
    });

    // Drop undefined fields so Contentful does not receive empty keys.
    for (const e of entries) for (const k of Object.keys(e.fields)) if (e.fields[k] === undefined) delete e.fields[k];
    for (const a of assets.values()) for (const k of Object.keys(a.fields)) if (a.fields[k] === undefined) delete a.fields[k];
    return { entries, assets: [...assets.values()] };
}

// ---------------------------------------------------------------------------
// Delivery API response (one locale) -> PortfolioContent (builds)
// ---------------------------------------------------------------------------

/**
 * @param {any} response JSON of GET /entries?content_type=profile&include=4&locale=<code>
 * @param {Locale} locale
 * @returns {PortfolioContent}
 */
function fromDelivery(response, locale) {
    const entriesById = new Map();
    const assetsById = new Map();
    for (const e of [...(response.items || []), ...((response.includes && response.includes.Entry) || [])]) entriesById.set(e.sys.id, e);
    for (const a of (response.includes && response.includes.Asset) || []) assetsById.set(a.sys.id, a);

    const profile = (response.items || [])[0];
    if (!profile) throw new Error('Contentful: no published profile entry');

    const entry = (/** @type {any} */ l) => {
        const e = entriesById.get(l.sys.id);
        if (!e) throw new Error(`Contentful: unresolved entry ${l.sys.id} (unpublished, or deeper than include)`);
        return e.fields;
    };
    const list = (/** @type {any[] | undefined} */ links) => (links || []).map(entry);

    /** @returns {Media | undefined} */
    const media = (/** @type {any} */ l, /** @type {{ caption?: string, decorative?: boolean }} */ opts = {}) => {
        if (!l) return undefined;
        const a = assetsById.get(l.sys.id);
        if (!a) throw new Error(`Contentful: unresolved asset ${l.sys.id}`);
        const file = a.fields.file || {};
        const image = (file.details && file.details.image) || {};
        /** @type {Media} */
        const m = { url: 'https:' + file.url, alt: opts.decorative ? '' : a.fields.description || '' };
        if (opts.caption) m.caption = opts.caption;
        if (image.width) m.width = image.width;
        if (image.height) m.height = image.height;
        return m;
    };
    const mediaList = (/** @type {any[] | undefined} */ links) => (links || []).map((l) => /** @type {Media} */ (media(l)));

    /** @returns {Link} */
    const link = (/** @type {any} */ f) => ({ label: f.label, url: f.url, kind: f.kind });
    const optional = (/** @type {Record<string, any>} */ o) => {
        for (const k of Object.keys(o)) if (o[k] === undefined) delete o[k];
        return o;
    };

    const p = profile.fields;
    return /** @type {PortfolioContent} */ ({
        locale,
        profile: optional({
            fullName: p.fullName,
            firstName: p.firstName,
            lastName: p.lastName,
            role: p.role,
            tagline: p.tagline,
            location: p.location,
            summary: splitParagraphs(p.summary),
            closing: splitParagraphs(p.closing),
            portrait: media(p.portrait, { caption: p.portraitCaption }),
            resume: media(p.resume),
        }),
        about: list(p.about).map((s) =>
            optional({
                id: s.slug,
                heading: s.heading,
                body: splitParagraphs(s.body),
                logo: media(s.logo),
                image: media(s.image, { caption: s.imageCaption }),
                imageAfter: s.imageAfter,
            })
        ),
        experience: list(p.experience).map((e) =>
            optional({
                id: e.slug,
                organization: e.organization,
                role: e.role,
                start: e.start,
                end: e.current ? null : e.end,
                dateLabel: e.dateLabel,
                website: e.website ? link(entry(e.website)) : undefined,
                logo: media(e.logo, { decorative: true }),
                summary: e.summary,
                highlights: splitLines(e.highlights),
                images: mediaList(e.images),
            })
        ),
        projectCategories: list(p.projectCategories).map((c) =>
            optional({
                id: c.slug,
                title: c.title,
                subtitle: c.subtitle,
                intro: c.intro,
                icon: media(c.icon, { decorative: true }),
                logo: media(c.logo),
                projects: list(c.projects).map((pr) =>
                    optional({
                        id: pr.slug,
                        title: pr.title,
                        context: pr.context,
                        description: splitParagraphs(pr.description),
                        highlights: splitLines(pr.highlights),
                        links: list(pr.links).map(link),
                        logo: media(pr.logo),
                        images: mediaList(pr.images),
                    })
                ),
            })
        ),
        awards: list(p.awards).map((a) => ({ id: a.slug, text: a.text })),
        languages: list(p.languages).map((l) => ({ language: l.language, level: l.level })),
        contact: {
            intro: p.contactIntro,
            email: p.email,
            phoneDisplay: p.phoneDisplay,
            whatsappUrl: p.whatsappUrl,
            links: list(p.contactLinks).map(link),
        },
    });
}

module.exports = { toContentful, fromDelivery, assetId, toId, splitParagraphs, splitLines };
