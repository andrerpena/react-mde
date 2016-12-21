import React from 'react';
import {render} from 'react-dom';
import App from './App';


// stylings
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../src/styles/react-mde.scss';
import './styles/demo.scss';

render(
    <App>
    </App>,
    document.getElementById('#app_container')
);