import { createContext, useContext, useState, useEffect } from 'react';
import { confirmUser, loginUserAPI } from '../apiservices/userservice';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginToggle, setLoginToggle] = useState(false);
    const [user, setUser]  = useState(null);

    const loginUserHandler = async (email, password) => {
        try {
            const data = await loginUserAPI(email, password);
            Cookies.set('token', data.token);
            setUser(data.user);
            setIsAuthenticated(true);
            setLoginToggle(!loginToggle)
    
            // go to the study page
            router.push('/study');
        } catch (error) {
            console.error('Failed to login user:', error);
            setIsAuthenticated(false);
        }
    };

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
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, loginToggle, loginUserHandler, user }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);