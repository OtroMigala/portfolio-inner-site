import React, { useEffect, useState } from 'react';
import Window from '../os/Window';
import { useInterval } from 'usehooks-ts';
import { motion, useReducedMotion } from 'framer-motion';
import profile from '../../constants/profile';
import { useLocale } from '../../i18n';

export interface CreditsProps extends WindowAppProps {}

// The original project is MIT-licensed; keep Henry Heffernan's credits.
const buildCredits = (t: ReturnType<typeof useLocale>['t'], fullName: string) => [
    {
        title: t('credits.adaptation'),
        rows: [[fullName, t('credits.adaptation.role')]],
    },
    {
        title: t('credits.original'),
        rows: [['Henry Heffernan', t('credits.original.role')]],
    },
    {
        title: t('credits.modeling'),
        rows: [
            ['Henry Heffernan', t('credits.modeling.textures')],
            ['Mickael Boitte', t('credits.modeling.computer')],
            ['Sean Nicolas', t('credits.modeling.environment')],
        ],
    },
    {
        title: t('credits.sound'),
        rows: [
            ['Henry Heffernan', t('credits.sound.mix')],
            ['Sound Cassette', t('credits.sound.office')],
            ['Windows 95 Startup Sound', 'Microsoft'],
        ],
    },
    {
        title: t('credits.inspiration'),
        rows: [
            ['Henry Heffernan', 'Bruno Simon'],
            ['Jesse Zhou', 'Pink Yellow'],
        ],
    },
];

const Credits: React.FC<CreditsProps> = (props) => {
    const { t, content } = useLocale();
    const fullName = content.profile.fullName;
    const CREDITS = buildCredits(t, fullName);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [time, setTime] = useState(0);
    // Reduced motion: no auto-advancing slides; the visitor moves on manually.
    const reduceMotion = useReducedMotion();

    // every 5 seconds, move to the next slide
    useInterval(
        () => {
            setTime(time + 1);
            // setCurrentSlide((currentSlide + 1) % CREDITS.length);
        },
        reduceMotion ? null : 1000
    );

    useEffect(() => {
        if (time > 5) {
            setCurrentSlide((currentSlide + 1) % CREDITS.length);
            setTime(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    const nextSlide = () => {
        setTime(0);
        setCurrentSlide((currentSlide + 1) % CREDITS.length);
    };

    return (
        // add on resize listener
        <Window
            top={48}
            left={48}
            width={1100}
            height={800}
            windowTitle={t('credits.title')}
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={`© ${profile.year} ${fullName}`}
        >
            <div
                onMouseDown={nextSlide}
                className="site-page"
                style={styles.credits}
            >
                <h2>{t('credits.title')}</h2>
                <p>
                    {profile.osName}, {profile.year}
                </p>
                <br />
                <br />
                <br />
                <div style={styles.slideContainer}>
                    {
                        <motion.div
                            animate={{ opacity: 1, y: -20 }}
                            transition={{ duration: 0.5 }}
                            key={`section-${CREDITS[currentSlide].title}`}
                            style={styles.section}
                        >
                            <h3 style={styles.sectionTitle}>
                                {CREDITS[currentSlide].title}
                            </h3>
                            {CREDITS[currentSlide].rows.map((row, i) => {
                                return (
                                    <div key={`row-${i}`} style={styles.row}>
                                        <p>{row[0]}</p>
                                        <p>{row[1]}</p>
                                    </div>
                                );
                            })}
                        </motion.div>
                    }
                </div>
                {/* Keyboard path to the next slide; pointer clicks anywhere on
                    the page already advance it through onMouseDown above. */}
                <button
                    type="button"
                    style={styles.nextButton}
                    onClick={(e) => {
                        if (e.detail === 0) nextSlide();
                    }}
                >
                    {t('credits.continue')}
                </button>
                <br />
                <div style={styles.nextSlideTimer}>
                    {/* make a time number of dots */}
                    {Array.from(Array(time)).map((i) => {
                        return (
                            <div key={i}>
                                <p>.</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    nextButton: {
        background: 'none',
        border: 'none',
        padding: 0,
        color: 'white',
        fontFamily: "Millennium, 'Times New Roman', Times, serif",
        fontSize: 18,
        cursor: 'pointer',
    },
    credits: {
        width: '100%',
        backgroundColor: 'black',
        paddingTop: 64,
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 64,
        color: 'white',
        overflow: 'hidden',
    },
    row: {
        overflow: 'none',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 600,
        alignSelf: 'center',
    },
    section: {
        overflow: 'none',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 32,
        opacity: 0,
    },
    sectionTitle: {
        marginBottom: 32,
    },
    slideContainer: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    nextSlideTimer: {
        width: 64,
        height: 32,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
};

export default Credits;
