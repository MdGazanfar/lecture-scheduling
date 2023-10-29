import { Outlet, Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import { readToken } from "../utils/localStorage";

const PrivateRoute = () => {
    const token = readToken();
    const navigate = useNavigate;

    if (!token) {
        navigate('/login')
    }

    return (
        token ? <Outlet /> : (<Navigate to="/login" />)
    )
};

export default PrivateRoute;