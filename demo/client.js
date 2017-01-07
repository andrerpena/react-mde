import React from 'react';
import {render} from 'react-dom';
import App from './App';


// stylings
import '../node_modules/normalize.css/normalize.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../src/styles/react-mde.scss';
import '../src/styles/react-mde-command-styles.scss';
import './styles/demo.scss';
import '../src/styles/markdown-default-theme.scss';

render(
    <App>
    </App>,
    document.getElementById('#app_container')
);