import React from 'react';
import ResumeDownload from './ResumeDownload';
import { useLocale } from '../../i18n';
import Inline from '../../content/Inline';
import ContentImage from '../../content/ContentImage';
import { dateRange } from '../../content/format';
import type { Experience as ExperienceEntry } from '../../content/types';

export interface ExperienceProps {}

const ExperienceHeader: React.FC<{ entry: ExperienceEntry }> = ({ entry }) => {
    const { t, months } = useLocale();
    return (
        <div style={styles.headerContainer}>
            <div style={styles.header}>
                {entry.logo && <ContentImage media={entry.logo} style={styles.logo} />}
                <div style={styles.headerRow}>
                    <h2 className="h1-style">{entry.organization}</h2>
                    {entry.website && (
                        <a rel="noreferrer" target="_blank" href={entry.website.url}>
                            <span className="h4-style">{entry.website.label}</span>
                            <span className="visually-hidden"> {t('newTab')}</span>
                        </a>
                    )}
                </div>
                <div style={styles.headerRow}>
                    <p className="h3-style">{entry.role}</p>
                    <p>
                        <b>{dateRange(entry, months, t('date.present'))}</b>
                    </p>
                </div>
            </div>
        </div>
    );
};

const Experience: React.FC<ExperienceProps> = (props) => {
    const { t, content } = useLocale();
    return (
        <div className="site-page-content">
            <h1 className="visually-hidden">{t('experience.title')}</h1>
            <ResumeDownload />
            {content.experience.map((entry) => (
                <React.Fragment key={entry.id}>
                    <ExperienceHeader entry={entry} />
                    <div className="text-block">
                        {entry.summary && (
                            <p>
                                <Inline text={entry.summary} />
                            </p>
                        )}
                        {entry.summary && entry.highlights.length > 0 && <br />}
                        {entry.highlights.length > 0 && (
                            <ul>
                                {entry.highlights.map((item, i) => (
                                    <li key={i}>
                                        <p>
                                            <Inline text={item} />
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {entry.images.map((media) => (
                            <ContentImage key={media.url} media={media} style={styles.image} width={900} />
                        ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    logo: {
        height: 40,
        width: 'auto',
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    image: {
        width: '100%',
        height: 'auto',
        marginTop: 16,
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export default Experience;
