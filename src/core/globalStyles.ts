import { css } from '@emotion/react';

import { fontFamily, palette } from 'settings/variables';

export const globalStyles = css`
    body {
        font-family: ${fontFamily.primary};
        color: ${palette.text.primary};
        margin: 0;
    }
`;
