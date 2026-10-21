import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../../i18n';
import ContentImage from '../../content/ContentImage';
import type { ProjectCategory } from '../../content/types';

export interface ProjectsProps {}

// A real link: reachable with Tab, opens with Enter, works with
// "open in new tab" and is announced as a link.
const ProjectBox: React.FC<{ category: ProjectCategory }> = ({ category }) => (
    <Link
        to={`/projects/${category.id}`}
        className="big-button-container"
        style={styles.projectLink}
    >
        <div style={styles.projectLinkLeft}>
            {category.icon && (
                <ContentImage
                    media={category.icon}
                    style={Object.assign(
                        {},
                        styles.projectLinkImage,
                        category.id === 'aerospace' ? styles.satelliteIcon : styles.computerIcon
                    )}
                />
            )}
            <div style={styles.projectText}>
                <span className="h1-style" style={{ fontSize: 48 }}>
                    {category.title}
                </span>
                <span className="h3-style" style={{ textTransform: 'uppercase' }}>
                    {category.subtitle}
                </span>
            </div>
        </div>
        <div style={styles.projectLinkRight}></div>
    </Link>
);

const Projects: React.FC<ProjectsProps> = (props) => {
    const { t, content } = useLocale();
    return (
        <div className="site-page-content">
            <h1>{t('projects.title')}</h1>
            <p className="h3-style">{t('projects.subtitle')}</p>
            <br />
            <p>{t('projects.intro')}</p>
            <br />
            <div style={styles.projectLinksContainer}>
                {content.projectCategories.map((category) => (
                    <ProjectBox key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    projectLinksContainer: {
        flexDirection: 'column',
        width: '100%',
        display: 'flex',
        flex: 1,
    },
    projectLink: {
        display: 'flex',
        color: 'inherit',
        textDecoration: 'none',
        marginBottom: 24,
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box',

        alignItems: 'center',
        justifyContent: 'space-between',
    },
    projectText: {
        justifyContent: 'center',
        flexDirection: 'column',
    },
    projectLinkImage: {
        width: 48,
        // height: 48,
        marginRight: 38,
    },
    projectLinkLeft: {
        marginLeft: 16,
        alignItems: 'center',
    },
    computerIcon: {
        width: 56,
        height: 56,
    },
    satelliteIcon: {
        width: 56,
        height: 56,
        imageRendering: 'pixelated',
    },
};

export default Projects;
