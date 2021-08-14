import React, { Component, ReactNode } from 'react';

import { ErrorInfo } from 'core/components/ErrorInfo';

interface Props {
    children: ReactNode;
}

export class RootErrorBoundary extends Component<Props> {
    state = { hasErrorOcurred: false };

    static getDerivedStateFromError() {
        return { hasErrorOcurred: true };
    }

    render() {
        if (this.state.hasErrorOcurred) {
            return <ErrorInfo title={'Error on page'} />;
        }

        return this.props.children;
    }
}
