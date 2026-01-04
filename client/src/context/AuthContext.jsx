import { createContext, useState } from 'react';

// Create the Context (The "Channel")
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// Create the Provider (The "Antenna" that wraps your app)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    // Function to run when user logs in
    const login = (token, userData) => {
        localStorage.setItem('token', token);
        setUser(userData || { token }) // Update state immedaiately
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}