import React from 'react';
import ResumeDownload from './ResumeDownload';
import aessLogo from '../../assets/pictures/logos/aess.svg';

export interface ExperienceProps {}

interface ExperienceHeaderProps {
    company: string;
    role: string;
    dates: string;
    url?: string;
    urlText?: string;
    logo?: string;
}

const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({
    company,
    role,
    dates,
    url,
    urlText,
    logo,
}) => {
    return (
        <div style={styles.headerContainer}>
            <div style={styles.header}>
                {logo && <img src={logo} style={styles.logo} alt="" />}
                <div style={styles.headerRow}>
                    <h1>{company}</h1>
                    {url && (
                        <a rel="noreferrer" target="_blank" href={url}>
                            <h4>{urlText || url}</h4>
                        </a>
                    )}
                </div>
                <div style={styles.headerRow}>
                    <h3>{role}</h3>
                    <b>
                        <p>{dates}</p>
                    </b>
                </div>
            </div>
        </div>
    );
};

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />
            <ExperienceHeader
                company="EzLife"
                role="Analista de Desarrollo de Software"
                dates="2026 - Presente"
                url="https://www.ezlife.com.co/"
                urlText="www.ezlife.com.co"
            />
            <div className="text-block">
                <p>
                    Desarrollo e implementación de sistemas de información
                    gubernamentales, con flujos de trabajo por estados y roles.
                    Trabajo con NestJS, gRPC, Next.js, React 19 y Docker.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Migración de sistemas monolíticos a arquitecturas de
                            microservicios con NestJS, comunicados mediante gRPC
                            y HTTP detrás de un API Gateway.
                        </p>
                    </li>
                    <li>
                        <p>
                            Modernización de interfaces web legadas hacia
                            Next.js y React 19, conservando la identidad visual
                            y conectándolas a los nuevos servicios.
                        </p>
                    </li>
                    <li>
                        <p>
                            Implementación de flujos por estados y roles, gestión
                            de plazos legales en días hábiles, numeración oficial
                            y trazabilidad de actos administrativos.
                        </p>
                    </li>
                    <li>
                        <p>
                            Módulos de gestión masiva de datos oficiales: cargas
                            masivas, inventarios por territorio y asignación
                            automática y manual.
                        </p>
                    </li>
                    <li>
                        <p>
                            Detección y corrección de vulnerabilidades y fallas
                            de integridad: suplantación de identidad, operaciones
                            sin transacción, pérdida silenciosa de datos entre
                            servicios y carga de archivos.
                        </p>
                    </li>
                    <li>
                        <p>
                            Aseguramiento de calidad con más de 300 pruebas
                            unitarias en Jest y pruebas end-to-end con Playwright
                            sobre entornos completos en Docker.
                        </p>
                    </li>
                    <li>
                        <p>
                            Integración de líneas de desarrollo paralelas y
                            documentación técnica: reportes de pruebas,
                            decisiones de negocio y guías de despliegue con
                            migraciones de datos.
                        </p>
                    </li>
                </ul>
            </div>
            <ExperienceHeader
                company="CIMDOL SAS"
                role="Ingeniero de Sistemas"
                dates="2025 - Presente"
            />
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Desarrollo de software y de la página web de la
                            organización.
                        </p>
                    </li>
                    <li>
                        <p>Apoyo en mantenimiento de hardware de oficina.</p>
                    </li>
                </ul>
            </div>
            <ExperienceHeader
                company="DSTEI Ticanor"
                role="Ingeniero de Sistemas"
                dates="2024 - Presente"
            />
            <div className="text-block">
                <p>
                    Proyecto financiado por la iniciativa DSTEI de IEEE para
                    construir un dron de monitoreo agrícola.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Diseño de algoritmos de fusión sensorial (LiDAR,
                            infrarrojo, acelerómetro y GPS) para el subsistema de
                            navegación del dron.
                        </p>
                    </li>
                </ul>
            </div>
            <ExperienceHeader
                company="IEEE AESS Unicauca"
                role="Vicepresidente"
                dates="Feb 2025 - Presente"
                logo={aessLogo}
            />
            <div className="text-block">
                <p>
                    Capítulo estudiantil de la IEEE Aerospace and Electronic
                    Systems Society en la Universidad del Cauca.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Lideré la gestión y consecución de 6.200 USD para el
                            proyecto "Voices of Water and Earth" (EPICS in
                            IEEE): nodos de comunicación con sensado y fusión de
                            datos para comunidades indígenas Misak del Cauca.
                        </p>
                    </li>
                    <li>
                        <p>
                            Dirigí los equipos de competencia del capítulo en el
                            concurso mundial CanSat de la UNAM, ediciones 2024 y
                            2025.
                        </p>
                    </li>
                    <li>
                        <p>
                            Dirigí la organización del hackathon NASA Space Apps
                            Challenge, ediciones 2024 y 2025.
                        </p>
                    </li>
                </ul>
            </div>
            <ExperienceHeader
                company="Freelance"
                role="Desarrollador Web"
                dates="Independiente"
            />
            <div className="text-block">
                <ul>
                    <li style={styles.row}>
                        <p>• Página web de Sonido Cárdenas</p>
                        <p>[ Empresa ]</p>
                    </li>
                    <li style={styles.row}>
                        <p>
                            • Página web del Semillero de Ingeniería
                            Aeroespacial SIA
                        </p>
                        <p>[ Unicauca ]</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    logo: {
        height: 40,
        width: 'auto',
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export default Experience;
