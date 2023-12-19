import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import { GameField } from "./scr.jsx";


// что во что вставлять

window.addEventListener("load", () => {
    const root = createRoot(document.getElementById("root"));
    root.render(<GameField />);
});
