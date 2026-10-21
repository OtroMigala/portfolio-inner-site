// @ts-check
// Contentful content types for the portfolio. Used by the setup script to
// create them and documented in docs/CMS-CONTENT-MODEL.md.
//
// Conventions (see spec 03, D3):
// - Text fields with paragraphs: paragraphs separated by a blank line.
// - Text fields with lists (highlights): one item per line.
// - Inline markdown subset in text: [label](url) and **bold**.
// - Images are assets; the localized description is the alt text.

/** @typedef {{ id: string, name: string, type: string, localized?: boolean, required?: boolean, linkType?: string, items?: any, validations?: any[] }} Field */

/** @typedef {Partial<Field>} FieldOptions */

/** @param {string} id @param {string} name @param {FieldOptions} [opts] @returns {Field} */
const symbol = (id, name, opts = {}) => ({ id, name, type: 'Symbol', ...opts });
/** @param {string} id @param {string} name @param {FieldOptions} [opts] @returns {Field} */
const text = (id, name, opts = {}) => ({ id, name, type: 'Text', ...opts });
/** @param {string} id @param {string} name @param {FieldOptions} [opts] @returns {Field} */
const asset = (id, name, opts = {}) => ({ id, name, type: 'Link', linkType: 'Asset', ...opts });
/** @param {string} id @param {string} name @param {string} contentType @param {FieldOptions} [opts] @returns {Field} */
const entry = (id, name, contentType, opts = {}) => ({
    id,
    name,
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: [contentType] }],
    ...opts,
});
/** @param {string} id @param {string} name @param {string} contentType @param {FieldOptions} [opts] @returns {Field} */
const entries = (id, name, contentType, opts = {}) => ({
    id,
    name,
    type: 'Array',
    items: { type: 'Link', linkType: 'Entry', validations: [{ linkContentType: [contentType] }] },
    ...opts,
});
/** @param {string} id @param {string} name @param {FieldOptions} [opts] @returns {Field} */
const assets = (id, name, opts = {}) => ({ id, name, type: 'Array', items: { type: 'Link', linkType: 'Asset' }, ...opts });
const L = { localized: true };
const R = { required: true };
const LR = { localized: true, required: true };

const LINK_KINDS = ['github', 'linkedin', 'instagram', 'website', 'repository'];
const DATE = { regexp: { pattern: '^\\d{4}(-\\d{2})?$' } };

/** @type {{ id: string, name: string, displayField: string, description: string, fields: Field[] }[]} */
const CONTENT_TYPES = [
    {
        id: 'link',
        name: 'Link',
        displayField: 'label',
        description: 'A labelled URL (website, repository, social profile).',
        fields: [
            symbol('label', 'Label', LR),
            symbol('url', 'URL', R),
            symbol('kind', 'Kind', { ...R, validations: [{ in: LINK_KINDS }] }),
        ],
    },
    {
        id: 'award',
        name: 'Award',
        displayField: 'slug',
        description: 'One line in the awards list.',
        fields: [symbol('slug', 'Slug', R), text('text', 'Text', LR)],
    },
    {
        id: 'languageSkill',
        name: 'Language skill',
        displayField: 'language',
        description: 'A spoken language and level.',
        fields: [symbol('language', 'Language', LR), symbol('level', 'Level', LR)],
    },
    {
        id: 'aboutSection',
        name: 'About section',
        displayField: 'heading',
        description: 'A titled block of the about page.',
        fields: [
            symbol('slug', 'Slug', R),
            symbol('heading', 'Heading', LR),
            text('body', 'Body (paragraphs separated by a blank line)', LR),
            asset('logo', 'Logo'),
            asset('image', 'Image'),
            symbol('imageCaption', 'Image caption', L),
            { id: 'imageAfter', name: 'Paragraphs before the image', type: 'Integer' },
        ],
    },
    {
        id: 'experience',
        name: 'Experience',
        displayField: 'organization',
        description: 'A job, role or engagement.',
        fields: [
            symbol('slug', 'Slug', R),
            symbol('organization', 'Organization', R),
            symbol('role', 'Role', LR),
            symbol('start', 'Start (YYYY or YYYY-MM)', { validations: [DATE] }),
            symbol('end', 'End (YYYY or YYYY-MM)', { validations: [DATE] }),
            { id: 'current', name: 'Current (no end date)', type: 'Boolean' },
            symbol('dateLabel', 'Date label (replaces the dates)', L),
            entry('website', 'Website', 'link'),
            asset('logo', 'Logo (decorative, next to the name)'),
            text('summary', 'Summary', L),
            text('highlights', 'Highlights (one per line)', LR),
            assets('images', 'Images'),
        ],
    },
    {
        id: 'project',
        name: 'Project',
        displayField: 'slug',
        description: 'A project inside a category.',
        fields: [
            symbol('slug', 'Slug', R),
            symbol('title', 'Title', LR),
            symbol('context', 'Context (event, client, programme)', L),
            text('description', 'Description (paragraphs separated by a blank line)', LR),
            text('highlights', 'Highlights (one per line)', L),
            entries('links', 'Links', 'link'),
            asset('logo', 'Logo'),
            assets('images', 'Images'),
        ],
    },
    {
        id: 'projectCategory',
        name: 'Project category',
        displayField: 'slug',
        description: 'Software or aerospace: groups projects and has its own page.',
        fields: [
            symbol('slug', 'Slug', { ...R, validations: [{ in: ['software', 'aerospace'] }] }),
            symbol('title', 'Title', LR),
            symbol('subtitle', 'Subtitle', LR),
            text('intro', 'Intro', LR),
            asset('icon', 'Icon (decorative, on the category card)'),
            asset('logo', 'Logo'),
            entries('projects', 'Projects', 'project'),
        ],
    },
    {
        id: 'profile',
        name: 'Profile',
        displayField: 'fullName',
        description: 'The single root entry. Its references decide what appears and in which order.',
        fields: [
            symbol('fullName', 'Full name', R),
            symbol('firstName', 'First name', R),
            symbol('lastName', 'Last name', R),
            symbol('role', 'Role', LR),
            symbol('tagline', 'Tagline', LR),
            symbol('location', 'Location', R),
            text('summary', 'Summary (paragraphs separated by a blank line)', LR),
            text('closing', 'Closing (paragraphs separated by a blank line)', LR),
            asset('portrait', 'Portrait'),
            symbol('portraitCaption', 'Portrait caption', L),
            asset('resume', 'Résumé (PDF)'),
            entries('about', 'About sections', 'aboutSection'),
            entries('experience', 'Experience', 'experience'),
            entries('projectCategories', 'Project categories', 'projectCategory'),
            entries('awards', 'Awards', 'award'),
            entries('languages', 'Languages', 'languageSkill'),
            text('contactIntro', 'Contact intro', LR),
            symbol('email', 'Email', R),
            symbol('phoneDisplay', 'Phone (as displayed)', R),
            symbol('whatsappUrl', 'WhatsApp URL', R),
            entries('contactLinks', 'Contact links', 'link'),
        ],
    },
];

module.exports = { CONTENT_TYPES, LINK_KINDS };
