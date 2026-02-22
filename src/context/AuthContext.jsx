import {createContext, useContext, useState} from "react";

//Create the context
const AuthContext = createContext(null);

//Custom hook
export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context;
}

//Auth provider component
export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    const isAuthenticated = user !== null;

//Login
const login = (username, password, role = 'regular') => {
    const mockToken = `mock_jwt_token_${Date.now()}`;
    const userData = {
        username,
        role,
        token: mockToken
    };
    setUser(userData);
    localStorage.setItem('authToken', mockToken);
    return userData;
}

//Logout
const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
};

const hasRole = (role) => {
    return user?.role === role;
};
const isAdmin = () => user?.role === "admin";
const value = {
    user,
    isAuthenticated,
    login,
    logout,
    hasRole,
    isAdmin
};
return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
);
}
