import React from 'react'
import { createRoot } from "react-dom/client";
import { App } from "./App";

import "../node_modules/normalize.css/normalize.css";
import "../src/styles/react-mde-all.scss";
import "./styles/demo.scss";
import "./styles/variables.scss";


const container = document.getElementById("#app_container");
const root = createRoot(container);
root.render(<App />);
