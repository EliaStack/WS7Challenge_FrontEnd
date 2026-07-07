import { Children, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider =({ children}) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if(storedToken) {
            setToken(storedToken);
        }
    }, [])

    const updateToken = (newToken) => {
        setToken(newToken);
        if(newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token'); 
        }
    }

    return (
        <AuthContext.Provider value={{token, setToken: updateToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);









