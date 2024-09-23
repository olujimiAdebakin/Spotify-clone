import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import PlayercontextProvider from "./Components/Context/Playercontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PlayercontextProvider>
        <App />
      </PlayercontextProvider>
    </BrowserRouter>
  </StrictMode>
);
