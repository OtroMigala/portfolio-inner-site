import React, { useState } from 'react';
import { IconName } from '../../assets/icons';
import Colors from '../../constants/colors';
import { Icon } from '../general';

export interface ButtonProps {
    icon?: IconName;
    text?: string;
    /** Accessible name; required when the button only shows an icon. */
    label?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, label, onClick }) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const outerBorderStyle = Object.assign(
        {},
        styles.outerBorder,
        icon && { width: 16, height: 14 }
    );

    const innerBorderStyle = Object.assign(
        {},
        styles.innerBorder,
        icon && { width: 12, height: 12 },
        text && { padding: 4 }
    );

    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={outerBorderStyle}
            onClick={() => onClick && onClick()}
        >
            <span
                style={Object.assign(
                    {},
                    isHovering && { backgroundColor: Colors.darkGray },
                    innerBorderStyle
                )}
            >
                {icon && <Icon icon={icon} style={styles.icon} />}
                {text && <span>{text}</span>}
            </span>
        </button>
    );
};

const styles: StyleSheetCSS = {
    outerBorder: {
        display: 'flex',
        padding: 0,
        border: `1px solid ${Colors.black}`,
        borderTopColor: Colors.white,
        borderLeftColor: Colors.white,
        background: Colors.lightGray,

        cursor: 'pointer',
    },
    innerBorder: {
        display: 'flex',
        border: `1px solid ${Colors.darkGray}`,
        borderTopColor: Colors.lightGray,
        borderLeftColor: Colors.lightGray,
        flex: 1,
    },
};

export default Button;
