import React from 'react';

import * as S from './errorInfoStyles';

interface Props {
    title?: string;
    subtitle?: string;
}

const DEFAULT_SUBTITLE = 'Something went wrong. You should contact with the site administrator';

export const ErrorInfo: React.FC<Props> = ({ title, subtitle = DEFAULT_SUBTITLE }) => {
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <S.Wrapper>
            <S.Title>{title}</S.Title>
            <S.Subtitle>{subtitle}</S.Subtitle>
            <S.ReloadButton onClick={refreshPage}>Reload page</S.ReloadButton>
        </S.Wrapper>
    );
};
