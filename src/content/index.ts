// Content for both locales, generated before every build by
// scripts/content/build-content.js (Contentful or the committed snapshot).
import es from './generated/es.json';
import en from './generated/en.json';
import type { Locale, Media, PortfolioContent } from './types';

const content = { es, en } as unknown as Record<Locale, PortfolioContent>;

export const getContent = (locale: Locale): PortfolioContent => content[locale];

// Images and documents under src/assets/pictures and /resume (the folders
// content media can point to), bundled by webpack. Media in the
// snapshot point here with `asset:<path>`; media from the CMS are full URLs.
// The cast only adds types (no @types/webpack-env here); webpack still sees a
// plain require.context call once TypeScript is stripped.
interface AssetContext {
    keys(): string[];
    (id: string): string;
}
const localAssets = (require as unknown as {
    context: (dir: string, recursive: boolean, filter: RegExp) => AssetContext;
}).context('../assets', true, /^\.\/(pictures|resume)\/.*\.(png|jpe?g|webp|gif|svg|pdf)$/);
const localAssetUrls: Record<string, string> = {};
localAssets.keys().forEach((key: string) => {
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
