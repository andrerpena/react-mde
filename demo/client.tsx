import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";

import "../node_modules/normalize.css/normalize.css";
import "../src/styles/react-mde-all.scss";
import "./styles/demo.scss";
import "./styles/variables.scss";

render(
    <App />,
    document.getElementById("#app_container"),
);
