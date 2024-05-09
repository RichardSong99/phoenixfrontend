import { createContext, useContext, useState, useEffect } from 'react';
import { confirmUser } from '../apiservices/userservice';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                await confirmUser();
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Failed to confirm user:', error);
            }
        };

        checkUser();
    }, []);

    return (
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);