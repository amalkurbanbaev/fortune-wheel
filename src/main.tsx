/* eslint-disable @typescript-eslint/no-non-null-assertion -- allow null assertion */
import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { App } from "./app.tsx";

import "@/styles/main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
