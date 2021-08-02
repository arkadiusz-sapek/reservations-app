import { AuthContext, resetAuthState } from 'common/contexts/AuthContext';
import { Button } from 'common/styled';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from 'settings/routes';

import * as S from './navBarStyles';

export interface Props {
    headerText: string;
    children: React.ReactNode;
}

export const NavBar = () => {
    const history = useHistory();
    const { dispatch } = useContext(AuthContext);

    const handleLogOut = () => {
        dispatch(resetAuthState());
        history.push(routes.loginPanel);
    };

    return (
        <S.Wrapper>
            <S.Header>Reservation App</S.Header>
            <Button onClick={handleLogOut}>Log out</Button>
        </S.Wrapper>
    );
};
