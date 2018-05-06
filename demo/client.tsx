import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";

// stylings
import "../node_modules/normalize.css/normalize.css";
import "../node_modules/draft-js/dist/Draft.css";
import "../src/styles/react-mde-all.scss";
import "./styles/demo.scss";
import "./styles/variables.scss";

render(
    <App />,
    document.getElementById("#app_container"),
);
