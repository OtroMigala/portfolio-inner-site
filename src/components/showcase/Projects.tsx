import React from 'react';
import { Link } from 'react-router-dom';
import software from '../../assets/pictures/projects/software.gif';
import satellite from '../../assets/pictures/projects/satellite.svg';

export interface ProjectsProps {}

interface ProjectBoxProps {
    icon: string;
    title: string;
    subtitle: string;
    route: string;
    iconStyle: React.CSSProperties;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({
    icon,
    title,
    subtitle,
    route,
    iconStyle,
}) => {
    // A real link: reachable with Tab, opens with Enter, works with
    // "open in new tab" and is announced as a link.
    return (
        <Link
            to={`/projects/${route}`}
            className="big-button-container"
            style={styles.projectLink}
        >
            <div style={styles.projectLinkLeft}>
                <img
                    src={icon}
                    style={Object.assign(
                        {},
                        styles.projectLinkImage,
                        iconStyle
                    )}
                    alt=""
                />
                <div style={styles.projectText}>
                    <span className="h1-style" style={{ fontSize: 48 }}>
                        {title}
                    </span>
                    <span className="h3-style">{subtitle}</span>
                </div>
            </div>
            <div style={styles.projectLinkRight}></div>
        </Link>
    );
};

const Projects: React.FC<ProjectsProps> = (props) => {
    return (
        <main className="site-page-content">
            <h1>Proyectos</h1>
            <p className="h3-style">Software y aeroespacial</p>
            <br />
            <p>
                Haz clic en una de las áreas para ver algunos de los proyectos
                en los que he trabajado en ese campo.
            </p>
            <br />
            <div style={styles.projectLinksContainer}>
                <ProjectBox
                    icon={software}
                    iconStyle={styles.computerIcon}
                    title="Software"
                    subtitle="PROYECTOS"
                    route="software"
                />
                <ProjectBox
                    icon={satellite}
                    iconStyle={styles.satelliteIcon}
                    title="Aeroespacial"
                    subtitle="CANSATS Y DRONES"
                    route="aerospace"
                />
            </div>
        </main>
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
