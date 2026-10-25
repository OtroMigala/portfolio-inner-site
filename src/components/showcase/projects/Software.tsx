import React from 'react';
import { Link } from 'react-router-dom';
import ResumeDownload from '../ResumeDownload';
import profile from '../../../constants/profile';
import su30Cockpit from '../../../assets/pictures/projects/su30-cockpit.png';
import livingBook from '../../../assets/pictures/projects/living-book.png';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Software</h1>
            <p className="h3-style">Proyectos</p>
            <br />
            <p>
                Estos son algunos de los proyectos de software en los que he
                trabajado. Mi experiencia profesional con sistemas de
                información gubernamentales está en la página de{' '}
                <Link to="/experience">experiencia</Link>.
            </p>
            <br />
            <ResumeDownload />
            <br />
            <div className="text-block">
                <h2>{profile.osName}</h2>
                <br />
                <p>
                    {profile.osName} es mi portafolio y el sitio en el que estás
                    ahora mismo. Es una adaptación del portafolio de código
                    abierto de Henry Heffernan (licencia MIT), que personalicé
                    con mi información, una iluminación más cálida y una
                    identidad propia.
                </p>
                <br />
                <p>
                    Técnicamente, el sitio tiene dos partes: una escena 3D y
                    este sistema operativo 2D. La escena usa Three.js para
                    renderizar un escritorio modelado y horneado (baked) en
                    Blender. La pantalla del computador es este sitio en React,
                    incrustado mediante un iframe y transformado con el
                    CSS3DRenderer de Three.js para dar la ilusión de que vive
                    dentro del monitor.
                </p>
                <br />
                <h3>Enlaces:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/henryjeff/portfolio-website"
                        >
                            <p>
                                <b>[GitHub]</b> - Repositorio original del sitio
                                3D (Henry Heffernan)
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/henryjeff/portfolio-inner-site"
                        >
                            <p>
                                <b>[GitHub]</b> - Repositorio original del
                                sistema operativo (Henry Heffernan)
                            </p>
                        </a>
                    </li>
                    <li>
                        <a rel="noreferrer" target="_blank" href={profile.github}>
                            <p>
                                <b>[GitHub]</b> - Mi perfil
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>Su-30</h2>
                <br />
                <p>
                    Un portafolio interactivo en el que vuelas sentado en la
                    cabina de un Su-30 de noche. El scroll recorre una ruta de
                    waypoints y cada waypoint es una sección: perfil,
                    proyectos, habilidades, contacto. La información aparece en
                    un HUD inspirado en Ace Combat y en una pantalla interactiva
                    (MFD) dentro de la cabina.
                </p>
                <br />
                <p>
                    Lo construí con React Three Fiber, three.js, GSAP
                    ScrollTrigger y Zustand. La física es real: el alabeo sale
                    del giro coordinado (tan φ = v·ω / g), el HUD muestra el
                    factor de carga (n = 1 / cos φ) y todo el suavizado es
                    independiente del frame rate.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            <b>HUD colimado</b> - La simbología se dibuja en un
                            plano lejano y se recorta con el stencil buffer
                            usando la malla del vidrio, así no tiene paralaje,
                            como un HUD real.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>MFD interactivo</b> - Una CanvasTexture sobre la
                            pantalla de la cabina; los clics se resuelven con
                            raycast, traduciendo la coordenada UV del impacto a
                            coordenadas del canvas.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Accesible</b> - Radio con aria-live, navegación
                            completa por teclado (Q/E, Enter, 1-7, F para mirar
                            alrededor) y vuelo manual con piloto automático.
                        </p>
                    </li>
                </ul>
                <img
                    src={su30Cockpit}
                    style={styles.image}
                    alt="Vista desde la cabina del Su-30 de noche, con el HUD verde sobre el vidrio, las pantallas del panel encendidas y el menú de secciones a la derecha"
                />
                <br />
                <h3>Enlaces:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://otromigala.github.io/Su-30/"
                        >
                            <p>
                                <b>[Sitio]</b> - Ver en vivo
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/OtroMigala/Su-30"
                        >
                            <p>
                                <b>[GitHub]</b> - Repositorio
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>The Living Book</h2>
                <br />
                <p>
                    Un libro 3D que se lee en el navegador. Sus páginas son
                    HTML real, su contenido vive en Contentstack y, cuando el 3D
                    no puede ejecutarse, se convierte en un libro 2D o en un
                    artículo plano. Funciona incluso sin JavaScript.
                </p>
                <br />
                <p>
                    También fue el proyecto piloto de un flujo de desarrollo
                    guiado por especificaciones: criterios de aceptación, matriz
                    de trazabilidad y presupuestos de rendimiento definidos
                    antes del código, ADRs, y cada etapa cerrada en una
                    compuerta con evidencia medida.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            <b>3D con presupuesto</b> - Astro, three.js y un
                            pipeline glTF (meshopt, WebP, glTF-Transform) con
                            límites de draw calls, triángulos y memoria de GPU
                            medidos en cada etapa.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>CMS headless</b> - Contenido modelado en
                            Contentstack, con entornos de producción y preview y
                            despliegues que se disparan al publicar.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Pruebas</b> - Más de 230 pruebas unitarias con
                            Vitest y cerca de 290 e2e con Playwright en
                            Chromium, Firefox, WebKit y móvil, con regresión
                            visual por píxeles y auditorías WCAG 2.2 con axe.
                        </p>
                    </li>
                </ul>
                <img
                    src={livingBook}
                    style={styles.image}
                    alt="El libro 3D abierto sobre una mesa de marquetería, junto a otros libros, una lupa y una vela encendida, sobre una alfombra roja"
                />
                <br />
                <h3>Enlaces:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://otromigala.github.io/the-living-book/"
                        >
                            <p>
                                <b>[Sitio]</b> - Ver en vivo
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/OtroMigala/the-living-book"
                        >
                            <p>
                                <b>[GitHub]</b> - Repositorio
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>Sitios web</h2>
                <br />
                <p>
                    Además de mi trabajo en sistemas de información, he
                    desarrollado páginas web para empresas y organizaciones:
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            <b>Sonido Cárdenas</b> - Página web de la empresa,
                            como trabajo independiente.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Semillero de Ingeniería Aeroespacial SIA</b> -
                            Página web del semillero de la Universidad del
                            Cauca, como trabajo independiente.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>CIMDOL SAS</b> - Software y página web de la
                            organización.
                        </p>
                    </li>
                </ul>
            </div>
            <ResumeDownload />
        </div>
    );
};

const styles: StyleSheetCSS = {
    image: {
        width: '100%',
        height: 'auto',
        marginTop: 16,
    },
};

export default SoftwareProjects;
