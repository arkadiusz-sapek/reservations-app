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
