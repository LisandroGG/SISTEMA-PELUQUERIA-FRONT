import { Navigate, useSearchParams } from "react-router-dom";

const TokenRoute = ({ children }) => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	if (!token) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default TokenRoute;
