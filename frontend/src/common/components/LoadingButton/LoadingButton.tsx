import { Button } from 'common/styled';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
    isLoading: boolean;
    children: React.ReactNode;
    type?: 'submit' | 'button' | 'reset';
    dataTestId?: string;
}

export const LoadingButton = ({
    isLoading,
    children,
    dataTestId = 'submitButton',
    type,
}: Props) => (
    <Button color="primary" type={type} disabled={isLoading} data-testid={dataTestId}>
        {children}
        <div className="inline-block ml-2 w-1">
            <ClipLoader size={15} color="white" loading={isLoading} />
        </div>
    </Button>
);
