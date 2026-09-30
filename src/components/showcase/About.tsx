import React from 'react';
import meBaby from '../../assets/pictures/alejo-bebe.jpg';
import meTrondheim from '../../assets/pictures/alejo-trondheim.jpg';
import meNow from '../../assets/pictures/alejo-retrato.jpg';
import isifLogo from '../../assets/pictures/logos/isif.png';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';
import profile from '../../constants/profile';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    return (
        // add on resize listener
        <div className="site-page-content">
            <h1 style={{ marginLeft: -16 }}>Bienvenido</h1>
            <h3>Soy {profile.fullName}</h3>
            <br />
            <div className="text-block">
                <p>
                    Estudio Ingeniería de Sistemas en la Universidad del Cauca,
                    en {profile.location}, y trabajo como desarrollador full
                    stack. Actualmente estoy en EzLife construyendo sistemas de
                    información gubernamentales con microservicios en NestJS,
                    Next.js y React.
                </p>
                <br />
                <p>
                    Gracias por tomarte el tiempo de explorar mi portafolio.
                    Espero que lo disfrutes tanto como yo disfruté armándolo. Si
                    tienes preguntas, propuestas o simplemente quieres saludar,
                    escríbeme desde <Link to="/contact">este formulario</Link> o
                    al correo{' '}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </p>
            </div>
            <ResumeDownload />
            <div className="text-block">
                <h3>Sobre mí</h3>
                <br />
                <p>
                    Mi lema es simple: {profile.tagline.toLowerCase()}. Me
                    muevo entre dos mundos que se cruzan más de lo que parece:
                    el desarrollo de software full stack y los sistemas
                    embebidos y aeroespaciales. En uno trabajo con Node.js,
                    NestJS, PostgreSQL/PostGIS, Next.js y React; en el otro, con
                    C sobre microcontroladores STM32, telemetría y filtros de
                    Kalman.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={meBaby} style={styles.image} alt="" />
                    <p>
                        <sub>
                            <b>Figura 1:</b> Yo, en mi primera versión beta :)
                        </sub>
                    </p>
                </div>

                <p>
                    Empecé Ingeniería de Sistemas en la Universidad del Cauca en
                    2021. Desde entonces he trabajado en la migración de
                    sistemas monolíticos a microservicios, en seguridad y
                    control de acceso (RBAC), en pruebas automatizadas con Jest
                    y Playwright, y en el desarrollo de páginas web como
                    freelance. Puedes ver el detalle en mi página de{' '}
                    <Link to="/experience">experiencia</Link>.
                </p>
                <br />
                <p>
                    Desde febrero de 2025 soy vicepresidente del capítulo
                    estudiantil IEEE AESS Unicauca. Ahí he dirigido los equipos
                    del capítulo en el concurso mundial CanSat de la UNAM y en
                    ENMICE, y la organización del hackathon NASA Space Apps
                    Challenge. Esos proyectos están en mi página de{' '}
                    <Link to="/projects/aerospace">proyectos aeroespaciales</Link>
                    .
                </p>
                <br />
                <br />
                <h3>Fusión de información</h3>
                <br />
                <img src={isifLogo} style={styles.logo} alt="ISIF" />
                <p>
                    Mi interés investigativo es la fusión de información
                    (information fusion) aplicada a navegación, drones/UAVs y
                    estimación de estados. La International Society of
                    Information Fusion (ISIF) me otorgó la beca FUSION dos
                    veces: en 2025 para el bootcamp en Río de Janeiro, Brasil, y
                    en 2026 para el bootcamp en la Norwegian University of
                    Science and Technology (NTNU), en Trondheim, Noruega.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={meTrondheim} style={styles.image} alt="" />
                    <p>
                        <sub>
                            <b>Figura 2:</b> Trondheim, Noruega, 2026
                        </sub>
                    </p>
                </div>
                <div style={{}}>
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'justify',
                            alignSelf: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <h3>Reconocimientos</h3>
                        <br />
                        <ul>
                            <li>
                                <p>
                                    Beca ISIF FUSION en 2025 (Río de Janeiro,
                                    Brasil) y 2026 (Trondheim, Noruega).
                                </p>
                            </li>
                            <li>
                                <p>
                                    8.º lugar en el Curso-Concurso Mundial
                                    CanSat 2025 (UNAM) con el equipo TULCAN-SAT.
                                </p>
                            </li>
                            <li>
                                <p>
                                    1.er lugar en la categoría Picosatélite –
                                    Carga Útil de ENMICE 2025 (Jalisco, México)
                                    con el equipo AIR-SAT.
                                </p>
                            </li>
                        </ul>
                        <br />
                        <h3>Idiomas</h3>
                        <br />
                        <p>Español nativo e inglés B1.</p>
                    </div>
                    <div style={styles.verticalImage}>
                        <img src={meNow} style={styles.image} alt="" />
                        <p>
                            <sub>
                                <b>Figura 3:</b> Yo, Trondheim 2026
                            </sub>
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <p>
                    ¡Gracias por leer sobre mí! Espero que disfrutes explorando
                    el resto de {profile.osName} y todo lo que tiene para
                    ofrecer. Y sí, los juegos del escritorio funcionan.
                </p>
                <br />
                <p>
                    Si tienes preguntas o comentarios, me encantaría leerlos.
                    Puedes escribirme desde la{' '}
                    <Link to="/contact">página de contacto</Link> o al correo{' '}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    image: {
        height: 'auto',
        width: '100%',
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
