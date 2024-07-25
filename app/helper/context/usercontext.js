import { createContext, useContext, useState, useEffect } from 'react';
import { confirmUser } from '../apiservices/userservice';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginToggle, setLoginToggle] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                await confirmUser();
                setIsAuthenticated(true);
                setLoginToggle(!loginToggle)
            } catch (error) {
                console.error('Failed to confirm user:', error);
            }
        };

        checkUser();
    }, []);

    return (
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, loginToggle }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);