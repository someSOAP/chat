import * as React from "react";
import * as ReactDOM from "react-dom";

import 'antd/dist/antd.css';
import './style.css';

import { App } from "./App";

ReactDOM.render(
    <App compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);
