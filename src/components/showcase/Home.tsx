import React from 'react';
import { Link } from '../general';
import profile from '../../constants/profile';

export interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.name}>{profile.fullName}</h1>
                <h2>{profile.role}</h2>
            </div>
            <div style={styles.buttons}>
                <Link containerStyle={styles.link} to="about" text="SOBRE MÍ" />
                <Link
                    containerStyle={styles.link}
                    to="experience"
                    text="EXPERIENCIA"
                />
                <Link
                    containerStyle={styles.link}
                    to="projects"
                    text="PROYECTOS"
                />
                <Link
                    containerStyle={styles.link}
                    to="contact"
                    text="CONTACTO"
                />
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    page: {
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
