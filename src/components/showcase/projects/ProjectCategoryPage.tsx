import React from 'react';
import ResumeDownload from '../ResumeDownload';
import { useLocale } from '../../../i18n';
import Inline from '../../../content/Inline';
import ContentImage from '../../../content/ContentImage';
import type { Link, ProjectCategory } from '../../../content/types';

const KIND_LABEL: Record<Link['kind'], string> = {
    github: 'GitHub',
    repository: 'GitHub',
    website: 'Web',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
};

/** One project category page (software, aerospace), rendered from the content model. */
const ProjectCategoryPage: React.FC<{ id: ProjectCategory['id'] }> = ({ id }) => {
    const { t, content } = useLocale();
    const category = content.projectCategories.find((c) => c.id === id);
    if (!category) return null;

    return (
        <div className="site-page-content">
            <h1>{category.title}</h1>
            <p className="h3-style">{category.subtitle}</p>
            <br />
            <p>
                <Inline text={category.intro} />
            </p>
            <br />
            {category.logo ? <ContentImage media={category.logo} style={styles.logo} /> : <ResumeDownload />}
            {category.projects.map((project) => (
                <div className="text-block" key={project.id}>
                    {project.logo && <ContentImage media={project.logo} style={styles.logo} />}
                    <h2>{project.title}</h2>
                    {project.context && <p className="h4-style">{project.context}</p>}
                    <br />
                    {project.description.map((text, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && <br />}
                            <p>
                                <Inline text={text} />
                            </p>
                        </React.Fragment>
                    ))}
                    {project.highlights.length > 0 && (
                        <>
                            <br />
                            <ul>
                                {project.highlights.map((item, i) => (
                                    <li key={i}>
                                        <p>
                                            <Inline text={item} />
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {project.links.length > 0 && (
                        <>
                            <br />
                            <h3>{t('projects.links')}</h3>
                            <ul>
                                {project.links.map((link) => (
                                    <li key={link.url}>
                                        <a rel="noreferrer" target="_blank" href={link.url}>
                                            <p>
                                                <b>[{KIND_LABEL[link.kind]}]</b> - {link.label}
                                                <span className="visually-hidden"> {t('newTab')}</span>
                                            </p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {project.images.map((media) => (
                        <ContentImage key={media.url} media={media} style={styles.image} width={900} />
                    ))}
                </div>
            ))}
            <ResumeDownload />
        </div>
    );
};

const styles: StyleSheetCSS = {
    logo: {
        height: 40,
        width: 'auto',
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 'auto',
        marginTop: 16,
    },
};

export default ProjectCategoryPage;
