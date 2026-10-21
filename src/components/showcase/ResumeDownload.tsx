import React from 'react';
import printer from '../../assets/resume/printer.gif';
import { useLocale } from '../../i18n';
import { mediaUrl } from '../../content';

export interface ResumeDownloadProps {
    altText?: string;
}

const ResumeDownload: React.FC<ResumeDownloadProps> = ({ altText }) => {
    const { t, content } = useLocale();
    const resume = content.profile.resume;
    if (!resume) return null;
    return (
        <div style={styles.resumeContainer}>
            <img style={styles.resumePrinter} alt="" src={printer} />
            <div style={styles.resumeContainerText}>
                <p className="h3-style">{altText || t('resume.title')}</p>
                <a rel="noreferrer" target="_blank" href={mediaUrl(resume)}>
                    <p>
                        {t('resume.cta')}
                        <span className="visually-hidden"> {t('newTab')}</span>
                    </p>
                </a>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    resumeContainer: {
        backgroundColor: 'white',
        padding: 12,
        boxSizing: 'border-box',
        border: '2px solid black',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        width: '100%',
        alignItems: 'center',
    },
    resumeContainerText: {
        flexDirection: 'column',
    },
    resumePrinter: {
        width: 56,
        height: 48,
        paddingRight: 24,
    },
};

export default ResumeDownload;
