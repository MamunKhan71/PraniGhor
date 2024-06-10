import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (!isAuth) {
            return navigate('/login', { state: { from: location.pathname } })
        }
    }, [isAuth, location, navigate])
    return isAuth ? children : null
};

export default PrivateRoutes;