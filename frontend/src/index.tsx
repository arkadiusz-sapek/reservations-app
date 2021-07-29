import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Global } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { globalStyles } from 'core/globalStyles';
import { App } from './App';

Modal.setAppElement('#root');

ReactDOM.render(
    <React.StrictMode>
        <Global styles={globalStyles} />
        <ToastContainer />
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
