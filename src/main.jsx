import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./redux/store.js";

function Root() {
useEffect(() => {
console.log("⏱ React montado", performance.now());
  const loader = document.getElementById("loading");
  const root = document.getElementById("root");

  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 300);
  }

  if (root) {
    root.style.opacity = "1"; // ahora se muestra React
  }
}, []);

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

console.log("⏱ Inicio de script", performance.now());

window.addEventListener("DOMContentLoaded", () => {
  console.log("⏱ DOM listo", performance.now());
});

window.addEventListener("load", () => {
  console.log("⏱ Recursos cargados", performance.now());
});

