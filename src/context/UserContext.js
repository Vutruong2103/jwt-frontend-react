import React, { useState } from 'react';

const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ isAuthenticated: false, token: '', account: {} });

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser(userData)
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };

    return (
        //su dung bien user, loginContext, logout cho global va chia se cho cac component con
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };