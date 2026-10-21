import React from 'react';
import ResumeDownload from '../ResumeDownload';
import aessLogo from '../../../assets/pictures/logos/aess.svg';
import tulcanSatLogo from '../../../assets/pictures/logos/Logo_TulcanSat.png';
import spaceAppsLogo from '../../../assets/pictures/logos/Square.png';
import tulcanSat from '../../../assets/pictures/projects/TULCANSAT.jpg';
import airSat from '../../../assets/pictures/projects/Air Sat.jpeg';
import airSatSatellite from '../../../assets/pictures/projects/sateliteAirsat.jpeg';
import ticanor1 from '../../../assets/pictures/projects/Ticanor1.jpeg';
import ticanor2 from '../../../assets/pictures/projects/Ticanor2.jpeg';

export interface AerospaceProjectsProps {}

const AerospaceProjects: React.FC<AerospaceProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Aeroespacial</h1>
            <p className="h3-style">CanSats y drones</p>
            <br />
            <p>
                Estos proyectos los he desarrollado principalmente con el
                capítulo estudiantil IEEE AESS de la Universidad del Cauca, del
                que soy vicepresidente desde febrero de 2025.
            </p>
            <br />
            <img src={aessLogo} style={styles.logo} alt="IEEE AESS" />
            <div className="text-block">
                <img src={tulcanSatLogo} style={styles.logo} alt="TULCAN-SAT" />
                <h2>TULCAN-SAT</h2>
                <p className="h4-style">Curso-Concurso Mundial CanSat 2025 (UNAM)</p>
                <br />
                <p>
                    CubeSat 2U de código abierto con descenso controlado sin
                    propulsión. La electrónica está basada en STM32, con
                    telemetría LoRa y un controlador PID combinado con un Filtro
                    de Kalman Extendido (EKF). Como líder de equipo, llevamos el
                    proyecto al 8.º lugar del concurso mundial.
                </p>
                <img src={tulcanSat} style={styles.image} alt="Equipo TULCAN-SAT con sus uniformes durante la competencia, mostrando el CanSat dentro de un tubo rotulado TULCAN-SAT" />
            </div>
            <div className="text-block">
                <h2>AIR-SAT</h2>
                <p className="h4-style">ENMICE 2025 (Jalisco, México)</p>
                <br />
                <p>
                    Sistema tipo CanSat con un EKF optimizado para monitorear la
                    calidad del aire y los contaminantes de escape de cohetes a
                    gran altura. Obtuvo el 1.er lugar en la categoría
                    Picosatélite – Carga Útil.
                </p>
                <img src={airSat} style={styles.image} alt="Equipo AIR-SAT en el escenario del 4.º Encuentro Mexicano de Ingeniería en Cohetería Experimental (ENMICE)" />
                <img src={airSatSatellite} style={styles.image} alt="El CanSat AIR-SAT: una carcasa roja impresa en 3D con el logo del equipo y el paracaídas plegado encima, junto a un peluche" />
            </div>
            <div className="text-block">
                <h2>Navegación de dron agrícola</h2>
                <p className="h4-style">Proyecto DSTEI Ticanor (IEEE)</p>
                <br />
                <p>
                    Diseño de algoritmos de fusión sensorial con LiDAR,
                    infrarrojo, acelerómetro y GPS para el subsistema de
                    navegación de un dron de monitoreo agrícola, en un proyecto
                    financiado por la iniciativa DSTEI de IEEE.
                </p>
                <img src={ticanor1} style={styles.image} alt="Equipo Ticanor en una sala de reuniones con varios drones sobre la mesa y la propuesta de la fase 3 proyectada al fondo" />
                <img src={ticanor2} style={styles.image} alt="Integrantes del equipo Ticanor sostienen drones junto a un portátil, frente a la presentación del proyecto" />
            </div>
            <div className="text-block">
                <h2>Voices of Water and Earth</h2>
                <p className="h4-style">EPICS in IEEE</p>
                <br />
                <p>
                    Nodos de comunicación con sensado y fusión de datos para
                    comunidades indígenas Misak del Cauca. Lideré la gestión y
                    consecución de 6.200 USD de financiamiento internacional
                    para el proyecto.
                </p>
            </div>
            <div className="text-block">
                <img src={spaceAppsLogo} style={styles.logo} alt="NASA Space Apps" />
                <h2>NASA Space Apps Challenge</h2>
                <p className="h4-style">Ediciones 2024 y 2025</p>
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
    image: {
        width: '100%',
        height: 'auto',
        marginTop: 16,
    },
};

export default AerospaceProjects;
