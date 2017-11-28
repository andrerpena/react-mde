import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';

// stylings
import "../node_modules/normalize.css/normalize.css";
import "../node_modules/font-awesome/css/font-awesome.css";

import "../src/styles/react-mde-all.scss";

import "./styles/demo.scss";

render(
    <App />,
    document.getElementById("#app_container")
);
