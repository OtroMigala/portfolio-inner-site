import React from 'react';
import { Media, mediaUrl } from '.';

interface ContentImageProps {
    media: Media;
    style?: React.CSSProperties;
    /** Display width in CSS px, used to request a resized copy from the CMS. */
    width?: number;
}

/**
 * An image from the content model. The alt text comes from the content (empty
 * only for decorative images, which the validator enforces). Images below the
 * first screen load lazily; known dimensions are passed to avoid layout shift.
 */
const ContentImage: React.FC<ContentImageProps> = ({ media, style, width }) => (
    <img
        src={mediaUrl(media, width)}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading="lazy"
        decoding="async"
        style={style}
    />
);

export default ContentImage;
