import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./redux/store.js";

function Root() {
	useEffect(() => {
		const loader = document.getElementById("loading");
		const root = document.getElementById("root");

		if (loader) {
			loader.style.opacity = "0";
			setTimeout(() => loader.remove(), 300);
		}

		if (root) {
			root.style.opacity = "1";
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
	</StrictMode>,
);
