import { createContext, useState } from 'react';

// Create the Context (The "Channel")
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// Create the Provider (The "Antenna" that wraps your app)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            const parsedUser = JSON.parse(storedUser);
            return { ...parsedUser, token: token};
        } else if (token) {
            return { token };
        }
        return null;
    });

    // Function to run when user logs in
    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser({...userData, token: token}) // Update state immedaiately
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}