import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import "../node_modules/normalize.css/normalize.css";
import "../src/styles/all.scss";
import "./styles/demo.scss";
import "./styles/variables.scss";

render(<App />, document.getElementById("#app_container"));
