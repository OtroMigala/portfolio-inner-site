import React from 'react';
import ResumeDownload from './ResumeDownload';
import { useLocale } from '../../i18n';
import Inline from '../../content/Inline';
import ContentImage from '../../content/ContentImage';
import type { AboutSection, Media } from '../../content/types';

export interface AboutProps {}

const Paragraphs: React.FC<{ items: string[] }> = ({ items }) => (
    <>
        {items.map((text, i) => (
            <React.Fragment key={i}>
                {i > 0 && <br />}
                <p>
                    <Inline text={text} />
                </p>
            </React.Fragment>
        ))}
    </>
);

const CaptionedImage: React.FC<{ media: Media }> = ({ media }) => (
    <figure className="captioned-image" style={styles.figure}>
        <ContentImage media={media} style={styles.image} width={900} />
        {media.caption && (
            <figcaption>
                <p>
                    <sub>{media.caption}</sub>
                </p>
            </figcaption>
        )}
    </figure>
);

// One block of the about page: heading, optional logo, paragraphs, and an
// image placed after `imageAfter` paragraphs (at the end by default).
const Section: React.FC<{ section: AboutSection }> = ({ section }) => {
    const split = section.imageAfter ?? section.body.length;
    return (
        <>
            <h2 className="h3-style">{section.heading}</h2>
            <br />
            {section.logo && <ContentImage media={section.logo} style={styles.logo} />}
            <Paragraphs items={section.body.slice(0, split)} />
            {section.image && (
                <>
                    <br />
                    <CaptionedImage media={section.image} />
                </>
            )}
            <Paragraphs items={section.body.slice(split)} />
            <br />
            <br />
        </>
    );
};

const About: React.FC<AboutProps> = (props) => {
    const { t, content } = useLocale();
    const p = content.profile;
    return (
        <div className="site-page-content">
            <h1 style={{ marginLeft: -16 }}>{t('about.welcome')}</h1>
            <h2 className="h3-style">{t('about.iam', { name: p.fullName })}</h2>
            <br />
            <div className="text-block">
                <Paragraphs items={p.summary} />
            </div>
            <ResumeDownload />
            <div className="text-block">
                {content.about.map((section) => (
                    <Section key={section.id} section={section} />
                ))}
                <div style={{}}>
                    <div style={styles.facts}>
                        <h2 className="h3-style">{t('about.awards')}</h2>
                        <br />
                        <ul>
                            {content.awards.map((award) => (
                                <li key={award.id}>
                                    <p>
                                        <Inline text={award.text} />
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <br />
                        <h2 className="h3-style">{t('about.languages')}</h2>
                        <br />
                        <ul>
                            {content.languages.map((l) => (
                                <li key={l.language}>
                                    <p>
                                        {l.language}: {l.level}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {p.portrait && (
                        <div style={styles.verticalImage}>
                            <CaptionedImage media={p.portrait} />
                        </div>
                    )}
                </div>
                <br />
                <br />
                <Paragraphs items={p.closing} />
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    image: {
        height: 'auto',
        width: '100%',
    },
    figure: {
        margin: 0,
    },
    facts: {
        flex: 1,
        textAlign: 'justify',
        alignSelf: 'center',
        flexDirection: 'column',
    },
    logo: {
        height: 48,
        width: 'auto',
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    verticalImage: {
        alignSelf: 'center',
        marginLeft: 32,
        flex: 0.8,

        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
    },
};

export default About;
