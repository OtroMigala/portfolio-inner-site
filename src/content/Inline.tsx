import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n';

// Section links in the content (`#experience`) are routes here; the 3D site's
// text view turns the same links into anchors.
const SECTION_ROUTES: Record<string, string> = {
    about: '/about',
    'about-me': '/about',
    'information-fusion': '/about',
    experience: '/experience',
    projects: '/projects',
    'projects-software': '/projects/software',
    'projects-aerospace': '/projects/aerospace',
    contact: '/contact',
};

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function Bold({ text }: { text: string }) {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return (
        <>
            {parts.map((part, i) => (i % 2 ? <b key={i}>{part}</b> : <React.Fragment key={i}>{part}</React.Fragment>))}
        </>
    );
}

/** Renders the content model's inline markdown subset: [label](url) and **bold**. */
const Inline: React.FC<{ text: string }> = ({ text }) => {
    const { t } = useLocale();
    const out: React.ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;
    LINK.lastIndex = 0;
    while ((match = LINK.exec(text))) {
        out.push(<Bold key={`t${last}`} text={text.slice(last, match.index)} />);
        const [, label, url] = match;
        if (url.startsWith('#')) {
            out.push(
                <Link key={`l${match.index}`} to={SECTION_ROUTES[url.slice(1)] || '/'}>
                    {label}
                </Link>
            );
        } else if (/^https?:\/\//.test(url)) {
            out.push(
                <a key={`l${match.index}`} href={url} target="_blank" rel="noreferrer">
                    {label}
                    <span className="visually-hidden"> {t('newTab')}</span>
                </a>
            );
        } else {
            out.push(
                <a key={`l${match.index}`} href={url}>
                    {label}
                </a>
            );
        }
        last = LINK.lastIndex;
    }
    out.push(<Bold key={`t${last}`} text={text.slice(last)} />);
    return <>{out}</>;
};

export default Inline;
