const colors = {
    white: '#FFFFFF',
    black: '#000000',
    // Windows 95 desktop teal. White 8px labels on it reach 4.77:1
    // (the previous #3e9697 gave 3.49:1, below WCAG AA).
    turquoise: '#008080',
    lightGray: '#c3c6ca',
    darkGray: '#86898d',
    blue: '#0000a3',
    darkBlue: '#0000aa',
    red: '#ff0000',
} as const;

export type ColorName = keyof typeof colors;
export type ThemeColor = typeof colors[ColorName];

export default colors;
