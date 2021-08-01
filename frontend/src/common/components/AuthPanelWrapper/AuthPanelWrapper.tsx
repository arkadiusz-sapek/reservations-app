import React from 'react';

import * as S from './authPanelStyles';

export interface Props {
    headerText: string;
    children: React.ReactNode;
}

export const AuthPanelWrapper = ({ headerText, children }: Props) => (
    <S.Wrapper>
        <S.Header>{headerText}</S.Header>
        {children}
    </S.Wrapper>
);
