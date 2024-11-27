import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContextProvider"
import { useEffect } from "react"

function AuthLayout() {

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, location])


    return (
        <div className="w-full h-full flex min-h-dvh sm:bg-indigo-500 items-center justify-center ">
            <Outlet />
        </div>
    )
}

export default AuthLayout