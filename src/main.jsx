import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</StrictMode>,
);

window.addEventListener("load", () => {
	const loader = document.getElementById("loading");
	if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove());
	}
});
