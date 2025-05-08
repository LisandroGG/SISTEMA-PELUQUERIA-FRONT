import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
	const user = useSelector((state) => state.user);
	const isLoadingSession = useSelector((state) => state.isLoadingSession);

	if (isLoadingSession) {
		return null;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (requiredRole && user.role !== requiredRole) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default PrivateRoute;
