import React from 'react';

interface Props {
    children: React.ReactNode;
}

export const FormActionsWrapper = ({ children }: Props) => (
    <div className="flex justify-end mt-8 gap-2 ">{children}</div>
);
