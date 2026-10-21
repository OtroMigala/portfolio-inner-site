import React from 'react';
import { Link } from '../general';
import { useLocale } from '../../i18n';

export interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const { t, content } = useLocale();
    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.name}>{content.profile.fullName}</h1>
                <h2>{content.profile.role}</h2>
            </div>
            <nav aria-label={t('nav.label')} style={styles.buttons}>
                <Link containerStyle={styles.link} to="about" text={t('nav.about')} />
                <Link
                    containerStyle={styles.link}
                    to="experience"
                    text={t('nav.experience')}
                />
                <Link
                    containerStyle={styles.link}
                    to="projects"
                    text={t('nav.projects')}
                />
                <Link
                    containerStyle={styles.link}
                    to="contact"
                    text={t('nav.contact')}
                />
            </nav>
        </div>
    );
};

const styles: StyleSheetCSS = {
    page: {
        // <nav> does not get the global `div { display: flex }` rule.
        display: 'flex',
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
    },
    header: {
        textAlign: 'center',
        marginBottom: 64,
        marginTop: 64,
        paddingLeft: 32,
        paddingRight: 32,

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    link: {
        padding: 16,
    },
    name: {
        fontSize: 64,
        marginBottom: 16,
        lineHeight: 0.9,
    },
};

export default Home;
