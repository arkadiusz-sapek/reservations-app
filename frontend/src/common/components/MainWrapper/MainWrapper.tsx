import { AuthContext, resetAuthState } from 'common/contexts/AuthContext';
import { Button } from 'common/styled';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from 'settings/routes';
import { NavBar } from '../NavBar';

import * as S from './mainWrapperStyles';

export interface Props {
    children: React.ReactNode;
}

export const MainWrapper = (props: Props) => {
    const history = useHistory();
    const { dispatch } = useContext(AuthContext);

    return (
        <>
            <NavBar />
            <S.Wrapper>{props.children}</S.Wrapper>
        </>
    );
};
