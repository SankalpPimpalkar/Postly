/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUserDetails } from "../lib/appwrite/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    fetchUser: () => { },
    setUser: () => { }
})

export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    async function fetchUser() {
        setIsLoading(true)
        try {

            const currentUser = await getCurrentUserDetails()
            if (currentUser) {
                setUser(currentUser);
                setIsAuthenticated(true);
            } else {
                navigate('/auth/login')
            }

        } catch (error) {
            console.log(error.message)
            navigate('/auth/login')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    console.log(user)

    const values = {
        user,
        isLoading,
        isAuthenticated,
        fetchUser,
        setUser
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext);