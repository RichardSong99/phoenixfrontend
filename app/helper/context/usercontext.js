import { createContext, useContext, useState, useEffect } from 'react';
import { confirmUser, loginUserAPI } from '../apiservices/userservice';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useData } from './datacontext';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginToggle, setLoginToggle] = useState(false);
    const [user, setUser]  = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const loginUserHandler = async (email, password) => {


        try {
            const data = await loginUserAPI(email, password);
            setAuthLoading(true);
            Cookies.set('token', data.token);
            setUser(data.user);
            console.log("user data", data);
            setIsAuthenticated(true);
            setLoginToggle(!loginToggle)
    
            // go to the study page
            router.push('/study/mydashboard');
            console.log("user data", data.token);
            return true;
        } catch (error) {
            setAuthLoading(false);
            console.error('Failed to login user:', error);
            setIsAuthenticated(false);
        }

        return false;

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
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, loginToggle, setLoginToggle, loginUserHandler, user,  setUser, authLoading, setAuthLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);