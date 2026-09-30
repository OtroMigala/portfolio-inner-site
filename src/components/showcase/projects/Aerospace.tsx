import React from 'react';
import ResumeDownload from '../ResumeDownload';
import aessLogo from '../../../assets/pictures/logos/aess.svg';

export interface AerospaceProjectsProps {}

const AerospaceProjects: React.FC<AerospaceProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Aeroespacial</h1>
            <h3>CanSats y drones</h3>
            <br />
            <p>
                Estos proyectos los he desarrollado principalmente con el
                capítulo estudiantil IEEE AESS de la Universidad del Cauca, del
                que soy vicepresidente desde febrero de 2025.
            </p>
            <br />
            <img src={aessLogo} style={styles.logo} alt="IEEE AESS" />
            <div className="text-block">
                <h2>TULCAN-SAT</h2>
                <h4>Curso-Concurso Mundial CanSat 2025 (UNAM)</h4>
                <br />
                <p>
                    CubeSat 2U de código abierto con descenso controlado sin
                    propulsión. La electrónica está basada en STM32, con
                    telemetría LoRa y un controlador PID combinado con un Filtro
                    de Kalman Extendido (EKF). Como líder de equipo, llevamos el
                    proyecto al 8.º lugar del concurso mundial.
                </p>
            </div>
            <div className="text-block">
                <h2>AIR-SAT</h2>
                <h4>ENMICE 2025 (Jalisco, México)</h4>
                <br />
                <p>
                    Sistema tipo CanSat con un EKF optimizado para monitorear la
                    calidad del aire y los contaminantes de escape de cohetes a
                    gran altura. Obtuvo el 1.er lugar en la categoría
                    Picosatélite – Carga Útil.
                </p>
            </div>
            <div className="text-block">
                <h2>Navegación de dron agrícola</h2>
                <h4>Proyecto DSTEI Ticanor (IEEE)</h4>
                <br />
                <p>
                    Diseño de algoritmos de fusión sensorial con LiDAR,
                    infrarrojo, acelerómetro y GPS para el subsistema de
                    navegación de un dron de monitoreo agrícola, en un proyecto
                    financiado por la iniciativa DSTEI de IEEE.
                </p>
            </div>
            <div className="text-block">
                <h2>Voices of Water and Earth</h2>
                <h4>EPICS in IEEE</h4>
                <br />
                <p>
                    Nodos de comunicación con sensado y fusión de datos para
                    comunidades indígenas Misak del Cauca. Lideré la gestión y
                    consecución de 6.200 USD de financiamiento internacional
                    para el proyecto.
                </p>
            </div>
            <div className="text-block">
                <h2>NASA Space Apps Challenge</h2>
                <h4>Ediciones 2024 y 2025</h4>
                <br />
                <p>
                    Dirigí la organización del hackathon NASA Space Apps
                    Challenge desde el capítulo.
                </p>
            </div>
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
};

export default AerospaceProjects;
