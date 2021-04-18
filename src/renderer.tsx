import React from "react";
import ReactDOM from "react-dom";

import app from "./App";
import UI from "./UI";

import "./reset.scss";
import "./index.scss";

ReactDOM.render(<UI />, document.getElementById("root"));

document.body.appendChild(app.view);
