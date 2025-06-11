import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
	const user = useSelector((state) => state.user);
	const isLoadingSession = useSelector((state) => state.isLoadingSession);

	if (isLoadingSession) {
		return null;
	}

	return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
