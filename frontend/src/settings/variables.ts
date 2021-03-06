export const palette = {
    primary: {
        light: '#757de8',
        main: '#3f51b5',
        dark: '#002984',
        contrastText: '#ffffff',
    },
    error: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#ffffff',
    },
    disabled: {
        main: '#e0e0e0',
    },
    text: {
        primary: '#171717',
    },
    background: {
        primary: '#ffffff',
    },
    boxShadows: {
        card: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),0px 1px 3px 0px rgb(0 0 0 / 12%)',
        modal: '0px 0px 17px 1px rgba(0,0,0,0.32)',
    },
};

export const fontSize = {
    verySmall: '0.6rem',
    small: '0.8rem',
    normal: '1rem',
    medium: '1.1rem',
    big: '1.6rem',
    huge: '2rem',
    large: '3rem',
};

export const fontWeight = {
    regular: '400',
    demiBold: '500',
    bold: '800',
};

export const fontFamily = {
    primary: 'Raleway',
};

export const breakpointsValues = {
    xs: 480,
    sm: 576,
    md: 675,
    lg: 920,
    xl: 1075,
};

const mediaQ = (size: number): string => `@media only screen and (min-width: ${size}px)`;

export const breakpoints = {
    sm: mediaQ(breakpointsValues.sm),
    md: mediaQ(breakpointsValues.md),
    lg: mediaQ(breakpointsValues.lg),
    xl: mediaQ(breakpointsValues.xl),
};

export const theme = {
    palette,
    fontSize,
    fontWeight,
    breakpoints,
    fontFamily,
};

export type ThemeTyping = typeof theme;

export const TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DAY_OF_WEEK_FORMAT = 'EEEE';
export const FULL_DATE_FORMAT = 'yyyy-MM-dd HH:mm';

export const TOKEN_COOKIE_NAME = 'TOKEN';
