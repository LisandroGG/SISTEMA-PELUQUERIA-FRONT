import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ScrollToTop from "./components/Utils/ScrollTop.jsx";
import { getUserSession } from "./redux/actions.js";
import store from "./redux/store.js";

function Root() {
	const user = useSelector((state) => state.user);
	const isLoadingSession = useSelector((state) => state.isLoadingSession);
	const dispatch = useDispatch();
	const [initialLoading, setInitialLoading] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			try {
				await dispatch(getUserSession());
			} catch (err) {
				console.error("No se pudo cargar la sesión:", err);
			} finally {
				const loader = document.getElementById("loading");
				const root = document.getElementById("root");
				if (loader) {
					loader.style.opacity = "0";
					setTimeout(() => loader.remove(), 300);
				}
				if (root) root.style.opacity = "1";

				setInitialLoading(false);
			}
		};

		if (!user) fetchSession();
		else setInitialLoading(false);
	}, [dispatch, user]);

	if (isLoadingSession || initialLoading) {
		return (
			<div className="fixed inset-0 flex flex-col items-center justify-center bg-[#ededed] z-[9999] transition-opacity duration-300">
				<img
					src="/assets/scissors-loading.svg"
					className="w-52"
					alt="Loading"
				/>
				<p className="text-lg">Cargando...</p>
			</div>
		);
	}

	return <App />;
}

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ScrollToTop />
				<Root />
			</BrowserRouter>
		</Provider>
	</StrictMode>,
);
