import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../constants/colors';
import { Icon } from '../general';
import { useLocale } from '../../i18n';
// import { } from '../general';
// import Home from '../site/Home';
// import Window from './Window';

export interface ToolbarProps {
    windows: DesktopWindows;
    toggleMinimize: (key: string) => void;
    shutdown: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    windows,
    toggleMinimize,
    shutdown,
}) => {
    const { t, locale, setLocale } = useLocale();
    const shutdownLabel = t('os.shutdown');
    const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let mins = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + mins + ' ' + amPm;
        return strTime;
    };

    const [startWindowOpen, setStartWindowOpen] = useState(false);
    const startAreaRef = useRef<HTMLDivElement>(null);
    const startButtonRef = useRef<HTMLButtonElement>(null);
    const firstOptionRef = useRef<HTMLButtonElement>(null);
    const [focusMenuOnOpen, setFocusMenuOnOpen] = useState(false);

    const [lastActive, setLastActive] = useState('');

    useEffect(() => {
        let max = 0;
        let k = '';
        Object.keys(windows).forEach((key) => {
            if (windows[key].zIndex >= max) {
                max = windows[key].zIndex;
                k = key;
            }
        });
        setLastActive(k);
    }, [windows]);

    const [time, setTime] = useState(getTime());

    // One interval for the component's lifetime. The previous effect had no
    // dependency list, so every render started another endless timer chain.
    useEffect(() => {
        const interval = setInterval(() => setTime(getTime()), 5000);
        return () => clearInterval(interval);
    }, []);

    // Close the start menu when clicking anywhere outside it.
    useEffect(() => {
        const onMouseDown = (event: MouseEvent) => {
            const target = event.target as Node | null;
            if (!target || !startAreaRef.current?.contains(target)) {
                setStartWindowOpen(false);
            }
        };
        window.addEventListener('mousedown', onMouseDown, false);
        return () => {
            window.removeEventListener('mousedown', onMouseDown, false);
        };
    }, []);

    useEffect(() => {
        if (startWindowOpen && focusMenuOnOpen) {
            firstOptionRef.current?.focus();
            setFocusMenuOnOpen(false);
        }
    }, [startWindowOpen, focusMenuOnOpen]);

    const toggleStartWindow = (event: React.MouseEvent) => {
        // Opened with Enter/Space: move focus into the menu.
        if (!startWindowOpen && event.detail === 0) setFocusMenuOnOpen(true);
        setStartWindowOpen(!startWindowOpen);
    };

    const onStartAreaKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape' && startWindowOpen) {
            // Keep Escape from also leaving the computer in the 3D site.
            event.stopPropagation();
            setStartWindowOpen(false);
            startButtonRef.current?.focus();
        }
    };

    return (
        <nav aria-label={t('os.taskbar')} style={styles.toolbarOuter}>
            <div ref={startAreaRef} onKeyDown={onStartAreaKeyDown}>
                {startWindowOpen && (
                    <div id="start-menu" style={styles.startWindow}>
                        <div style={styles.startWindowInner}>
                            <div
                                style={styles.verticalStartContainer}
                                aria-hidden="true"
                            >
                                <p style={styles.verticalText}>JACUSys</p>
                            </div>
                            <div style={styles.startWindowContent}>
                                <div style={styles.startMenuSpace} />
                                <div style={styles.startMenuLine} />
                                <button
                                    type="button"
                                    ref={firstOptionRef}
                                    className="start-menu-option"
                                    style={styles.startMenuOption}
                                    onClick={shutdown}
                                >
                                    <Icon
                                        style={styles.startMenuIcon}
                                        icon="computerBig"
                                    />
                                    <span style={styles.startMenuText}>
                                        <u>{shutdownLabel[0]}</u>
                                        {shutdownLabel.slice(1)}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div style={styles.toolbarInner}>
                <div style={styles.toolbar}>
                    <button
                        type="button"
                        ref={startButtonRef}
                        aria-expanded={startWindowOpen}
                        aria-controls="start-menu"
                        style={Object.assign(
                            {},
                            styles.startContainerOuter,
                            startWindowOpen && styles.activeTabOuter
                        )}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={toggleStartWindow}
                        onKeyDown={onStartAreaKeyDown}
                    >
                        <span
                            style={Object.assign(
                                {},
                                styles.startContainer,
                                startWindowOpen && styles.activeTabInner
                            )}
                        >
                            <Icon
                                size={18}
                                icon="windowsStartIcon"
                                style={styles.startIcon}
                            />
                            <span className="toolbar-text ">{t('os.start')}</span>
                        </span>
                    </button>
                    <div style={styles.toolbarTabsContainer}>
                        {Object.keys(windows).map((key) => {
                            const active =
                                lastActive === key && !windows[key].minimized;
                            return (
                                <button
                                    type="button"
                                    key={key}
                                    aria-pressed={active}
                                    style={Object.assign(
                                        {},
                                        styles.tabContainerOuter,
                                        active && styles.activeTabOuter
                                    )}
                                    onClick={() => toggleMinimize(key)}
                                >
                                    <span
                                        style={Object.assign(
                                            {},
                                            styles.tabContainer,
                                            active && styles.activeTabInner
                                        )}
                                    >
                                        <Icon
                                            size={18}
                                            icon={windows[key].icon}
                                            style={styles.tabIcon}
                                        />
                                        <span style={styles.tabText}>
                                            {windows[key].name}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                {/* Language toggle, labelled with the language it switches to. */}
                <button
                    type="button"
                    className="toolbar-text"
                    style={styles.langButton}
                    lang={t('os.langToggleCode')}
                    // The name starts with the visible text (WCAG 2.5.3), so a
                    // voice-control user can say "click EN".
                    aria-label={`${t('os.langToggle')} – ${t('os.langToggleLabel')}`}
                    title={t('os.langToggleLabel')}
                    onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
                >
                    {t('os.langToggle')}
                </button>
                <div style={styles.time}>
                    <Icon style={styles.volumeIcon} icon="volumeOn" />
                    <p style={styles.timeText}>{time}</p>
                </div>
            </div>
        </nav>
    );
};

const styles: StyleSheetCSS = {
    toolbarOuter: {
        // <nav> does not get the global `div { display: flex }` rule.
        display: 'flex',
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 32,
        background: Colors.lightGray,
        borderTop: `1px solid ${Colors.lightGray}`,
        zIndex: 100000,
    },
    verticalStartContainer: {
        // width: 30,
        height: '100%',
        background: Colors.darkGray,
    },
    verticalText: {
        fontFamily: 'Terminal',
        textOrientation: 'sideways',
        fontSize: 32,
        padding: 4,
        paddingBottom: 64,
        paddingTop: 8,
        letterSpacing: 1,
        color: Colors.lightGray,
        transform: 'scale(-1)',
        WebkitTransform: 'scale(-1)',
        MozTransform: 'scale(-1)',
        msTransform: 'scale(-1)',
        OTransform: 'scale(-1)',
        // @ts-ignore
        writingMode: 'tb-rl',
    },
    startWindowContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        // alignItems: 'flex-end',
    },
    startWindow: {
        position: 'absolute',
        bottom: 28,
        display: 'flex',
        flex: 1,
        width: 256,
        // height: 400,
        left: 4,
        boxSizing: 'border-box',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
        background: Colors.lightGray,
    },
    activeTabOuter: {
        border: `1px solid ${Colors.black}`,
        borderBottomColor: Colors.white,
        borderRightColor: Colors.white,
    },
    startWindowInner: {
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        flex: 1,
    },
    startMenuIcon: {
        width: 32,
        height: 32,
    },
    startMenuText: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        marginLeft: 8,
    },
    startMenuOption: {
        display: 'flex',
        width: '100%',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        boxSizing: 'content-box',
        alignItems: 'center',
        // flex: 1,
        height: 24,
        padding: 12,
    },
    startMenuSpace: {
        flex: 1,
    },
    startMenuLine: {
        height: 1,
        background: Colors.white,
        borderTop: `1px solid ${Colors.darkGray}`,
    },
    activeTabInner: {
        border: `1px solid ${Colors.darkGray}`,
        borderBottomColor: Colors.lightGray,
        borderRightColor: Colors.lightGray,
        backgroundImage: `linear-gradient(45deg, white 25%, transparent 25%),
        linear-gradient(-45deg,  white 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%,  white 75%),
        linear-gradient(-45deg, transparent 75%,  white 75%)`,
        backgroundSize: `4px 4px`,
        backgroundPosition: `0 0, 0 2px, 2px -2px, -2px 0px`,
        pointerEvents: 'none',
    },
    tabContainerOuter: {
        display: 'flex',
        padding: 0,
        background: 'none',
        flex: 1,
        maxWidth: 300,
        marginRight: 4,
        boxSizing: 'border-box',
        cursor: 'pointer',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
    },
    tabContainer: {
        display: 'flex',
        minWidth: 0,
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        alignItems: 'center',
        paddingLeft: 4,
        flex: 1,
    },
    tabIcon: {
        marginRight: 6,
    },
    startContainer: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 1,
        // background: 'red',
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        padding: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    startContainerOuter: {
        display: 'flex',
        padding: 0,
        background: 'none',
        marginLeft: 3,
        boxSizing: 'border-box',
        cursor: 'pointer',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
    },
    toolbarTabsContainer: {
        // background: 'blue',
        flex: 1,
        marginLeft: 4,
        marginRight: 4,
    },
    startIcon: {
        marginRight: 4,
    },
    toolbarInner: {
        borderTop: `1px solid ${Colors.white}`,

        alignItems: 'center',
        flex: 1,
    },
    toolbar: {
        flexGrow: 1,
        width: '100%',
    },
    langButton: {
        height: 24,
        marginRight: 4,
        padding: '0 6px',
        background: Colors.lightGray,
        border: `1px solid ${Colors.black}`,
        borderTopColor: Colors.white,
        borderLeftColor: Colors.white,
        fontSize: 14,
        cursor: 'pointer',
    },
    time: {
        flexShrink: 1,
        width: 86,
        height: 24,
        boxSizing: 'border-box',
        marginRight: 4,
        paddingLeft: 4,
        paddingRight: 4,
        border: `1px solid ${Colors.white}`,
        borderTopColor: Colors.darkGray,

        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftColor: Colors.darkGray,
    },
    volumeIcon: {
        cursor: 'pointer',
        height: 18,
    },
    tabText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: 14,
        fontFamily: 'MSSerif',
    },
    timeText: {
        fontSize: 12,
        fontFamily: 'MSSerif',
    },
};

export default Toolbar;
