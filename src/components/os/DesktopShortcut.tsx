import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconName } from '../../assets/icons';
import colors from '../../constants/colors';
import { Icon } from '../general';

export interface DesktopShortcutProps {
    icon: IconName;
    shortcutName: string;
    appKey?: string;
    invertText?: boolean;
    onOpen: () => void;
}

// Mouse: click selects, double click opens (like Windows 95).
// Keyboard: it is a real button, so Enter or Space opens the app directly.
const DesktopShortcut: React.FC<DesktopShortcutProps> = ({
    icon,
    shortcutName,
    appKey,
    invertText,
    onOpen,
}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [lastSelected, setLastSelected] = useState(false);
    const containerRef = useRef<HTMLButtonElement>(null);

    const [scaledStyle, setScaledStyle] = useState({});

    const requiredIcon = require(`../../assets/icons/${icon}.png`);
    const [doubleClickTimerActive, setDoubleClickTimerActive] = useState(false);

    useEffect(() => {
        if (containerRef.current && Object.keys(scaledStyle).length === 0) {
            const boundingBox = containerRef.current.getBoundingClientRect();
            setScaledStyle({
                transformOrigin: 'center',
                transform: 'scale(1.5)',
                left: boundingBox.width / 4,
                top: boundingBox.height / 4,
            });
        }
    }, [scaledStyle]);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            const target = event.target as Node | null;
            if (!target || !containerRef.current?.contains(target)) {
                setIsSelected(false);
            }
            if (!isSelected && lastSelected) {
                setLastSelected(false);
            }
        },
        [isSelected, setIsSelected, setLastSelected, lastSelected]
    );

    const handleMouseDown = useCallback(() => {
        if (doubleClickTimerActive) {
            onOpen && onOpen();
            setIsSelected(false);
            setDoubleClickTimerActive(false);
            return;
        }
        setIsSelected(true);
        setLastSelected(true);
        setDoubleClickTimerActive(true);
        // set double click timer
        setTimeout(() => {
            setDoubleClickTimerActive(false);
        }, 300);
    }, [doubleClickTimerActive, setIsSelected, onOpen]);

    // A click with detail 0 was triggered by Enter/Space, not by a pointer.
    const handleClick = (event: React.MouseEvent) => {
        if (event.detail === 0) onOpen && onOpen();
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSelected, handleClickOutside]);

    return (
        <button
            type="button"
            data-desktop-shortcut={appKey}
            style={Object.assign({}, styles.appShortcut, scaledStyle)}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
            ref={containerRef}
        >
            <span style={styles.iconContainer}>
                <span
                    className="desktop-shortcut-icon"
                    style={Object.assign(
                        {},
                        styles.iconOverlay,
                        isSelected && styles.checkerboard,
                        isSelected && {
                            WebkitMask: `url(${requiredIcon})`,
                        }
                    )}
                />
                <Icon icon={icon} style={styles.icon} />
            </span>
            <span
                className={
                    isSelected
                        ? 'selected-shortcut-border'
                        : lastSelected
                        ? 'shortcut-border'
                        : ''
                }
                style={Object.assign(
                    {},
                    styles.labelContainer,
                    isSelected ? { backgroundColor: colors.blue } : {}
                )}
            >
                <span
                    style={Object.assign(
                        {},
                        styles.shortcutText,
                        invertText && !isSelected && { color: 'black' }
                    )}
                >
                    {shortcutName}
                </span>
            </span>
        </button>
    );
};

const styles: StyleSheetCSS = {
    appShortcut: {
        position: 'absolute',
        width: 56,
        display: 'flex',
        padding: 0,
        background: 'none',
        border: 'none',

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        cursor: 'pointer',
    },
    shortcutText: {
        display: 'block',
        cursor: 'pointer',
        textOverflow: 'wrap',
        fontFamily: 'MSSerif',
        color: 'white',
        fontSize: 8,
        paddingRight: 2,
        paddingLeft: 2,
    },
    labelContainer: {
        display: 'flex',
    },
    iconContainer: {
        display: 'flex',
        position: 'relative',
        cursor: 'pointer',
        paddingBottom: 3,
    },
    iconOverlay: {
        position: 'absolute',
        top: 0,
        width: 32,
        height: 32,
    },
    checkerboard: {
        backgroundImage: `linear-gradient(45deg, ${colors.blue} 25%, transparent 25%),
        linear-gradient(-45deg, ${colors.blue} 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, ${colors.blue} 75%),
        linear-gradient(-45deg, transparent 75%, ${colors.blue} 75%)`,
        backgroundSize: `2px 2px`,
        backgroundPosition: `0 0, 0 1px, 1px -1px, -1px 0px`,
        pointerEvents: 'none',
    },
};

export default DesktopShortcut;
