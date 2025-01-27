import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";
import useAdmin from "../../hooks/useAdmin";
import { useContext } from "react";
import Loading from "../../components/Loading";


const AdminRoute = ({ children }) => {
    const {user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;