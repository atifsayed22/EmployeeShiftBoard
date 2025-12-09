import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

 const ProtectedRoutes = ({children, allowed}) =>{
    const {user} = useAuth();

    if(!user){
        return <Navigate to="/login" replace />;
    }

    if(allowed && !allowed.includes(user.role)){
        return <Navigate to="/unauthorized" replace />;
    }

    return children 
}

export default ProtectedRoutes;