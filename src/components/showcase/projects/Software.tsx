import React from 'react';
import { Link } from 'react-router-dom';
import ResumeDownload from '../ResumeDownload';
import profile from '../../../constants/profile';

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

export default SoftwareProjects;
