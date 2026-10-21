// Content for both locales, generated before every build by
// scripts/content/build-content.js (Contentful or the committed snapshot).
import es from './generated/es.json';
import en from './generated/en.json';
import type { Locale, Media, PortfolioContent } from './types';

const content = { es, en } as unknown as Record<Locale, PortfolioContent>;

export const getContent = (locale: Locale): PortfolioContent => content[locale];

// Every image and document under src/assets, bundled by webpack. Media in the
// snapshot point here with `asset:<path>`; media from the CMS are full URLs.
const localAssets = require.context('../assets', true, /\.(png|jpe?g|webp|gif|svg|pdf)$/);
const localAssetUrls: Record<string, string> = {};
localAssets.keys().forEach((key) => {
    localAssetUrls[key.replace(/^\.\//, '')] = localAssets(key);
});

/**
 * URL to use in src/href. For Contentful images, `width` asks the Images API
 * for a resized copy instead of the original upload.
 */
export function mediaUrl(media: Media, width?: number): string {
    if (media.url.startsWith('asset:')) {
        const url = localAssetUrls[media.url.slice('asset:'.length)];
        if (!url) throw new Error(`Missing local asset ${media.url}`);
        return url;
    }
    const isImage = /images\.ctfassets\.net/.test(media.url);
    return isImage && width ? `${media.url}?w=${width}&q=80&fm=webp` : media.url;
}

export type { Locale, Media, PortfolioContent };
