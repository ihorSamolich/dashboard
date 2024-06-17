import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import React from "react";

import App from "./App.tsx";
import "./css/index.css";
import ThemeProvider from "./utils/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
);
