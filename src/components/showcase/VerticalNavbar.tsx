import React, { useEffect, useState } from 'react';
import { Link } from '../general';
import { useLocation, useNavigate } from 'react-router-dom';
import profile from '../../constants/profile';

export interface VerticalNavbarProps {}

const VerticalNavbar: React.FC<VerticalNavbarProps> = (props) => {
    const location = useLocation();
    const [projectsExpanded, setProjectsExpanded] = useState(false);
    const [isHome, setIsHome] = useState(false);

    const navigate = useNavigate();
    const goToContact = () => {
        navigate('/contact');
    };

    useEffect(() => {
        if (location.pathname.includes('/projects')) {
            setProjectsExpanded(true);
        } else {
            setProjectsExpanded(false);
        }
        if (location.pathname === '/') {
            setIsHome(true);
        } else {
            setIsHome(false);
        }
        return () => {};
    }, [location.pathname]);

    // The page's own h1 is the section title; the name here is branding.
    return !isHome ? (
        <nav aria-label="Secciones del portafolio" style={styles.navbar}>
            <div style={styles.header}>
                <p className="h1-style" style={styles.headerText}>
                    {profile.firstName}
                </p>
                <p className="h1-style" style={styles.headerText}>
                    {profile.lastName}
                </p>
                <p className="h3-style" style={styles.headerShowcase}>
                    Portafolio '{String(profile.year).slice(-2)}
                </p>
            </div>
            <div style={styles.links}>
                <Link containerStyle={styles.link} to="" text="INICIO" />
                <Link containerStyle={styles.link} to="about" text="SOBRE MÍ" />
                <Link
                    containerStyle={styles.link}
                    to="experience"
                    text="EXPERIENCIA"
                />
                <Link
                    containerStyle={Object.assign(
                        {},
                        styles.link,
                        projectsExpanded && styles.expandedLink
                    )}
                    to="projects"
                    text="PROYECTOS"
                />
                {
                    // if current path contains projects
                    projectsExpanded && (
                        <div style={styles.insetLinks}>
                            <Link
                                containerStyle={styles.insetLink}
                                to="projects/software"
                                text="SOFTWARE"
                            />
                            <Link
                                containerStyle={styles.insetLink}
                                to="projects/aerospace"
                                text="AEROESPACIAL"
                            />
                        </div>
                    )
                }
                <Link
                    containerStyle={styles.link}
                    to="contact"
                    text="CONTACTO"
                />
            </div>
            <div style={styles.spacer} />
            <div style={styles.forHireContainer} onMouseDown={goToContact}>
                {/* <img src={forHire} style={styles.image} alt="" /> */}
            </div>
        </nav>
    ) : (
        <></>
    );
};

const styles: StyleSheetCSS = {
    navbar: {
        // <nav> does not get the global `div { display: flex }` rule.
        display: 'flex',
        width: 300,
        height: '100%',
        flexDirection: 'column',
        padding: 48,
        boxSizing: 'border-box',
        position: 'fixed',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'column',
        marginBottom: 64,
    },
    headerText: {
        fontSize: 38,
        lineHeight: 1,
    },
    headerShowcase: {
        marginTop: 12,
    },
    logo: {
        width: '100%',
        marginBottom: 8,
    },
    link: {
        marginBottom: 32,
    },
    expandedLink: {
        marginBottom: 16,
    },
    insetLinks: {
        flexDirection: 'column',
        marginLeft: 32,
        marginBottom: 16,
    },
    insetLink: {
        marginBottom: 8,
    },
    links: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: '80%',
    },
    spacer: {
        flex: 1,
    },
    forHireContainer: {
        cursor: 'pointer',

        width: '100%',
    },
};

export default VerticalNavbar;
