import styled from '@emotion/styled';

import { fontSize, fontWeight, palette } from 'settings/variables';
import { Button } from 'common/styled';

export const Wrapper = styled.div`
    background: ${palette.primary.main};
    color: ${palette.text.primary};
`;

export const Title = styled.h1`
    font-size: ${fontSize.large};
    font-weight: ${fontWeight.bold};
`;

export const Subtitle = styled.h2`
    font-size: ${fontSize.big};
    font-weight: ${fontWeight.regular};
`;

export const ReloadButton = styled(Button)`
    color: ${palette.text.primary};
    cursor: pointer;
`;
