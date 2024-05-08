import {createContext, useState} from 'react';

export const NavBarContext = createContext();

export const NavBarProvider = ({children}) => {
    const [isStudyNavBarVisible, setIsStudyNavBarVisible] = useState(true);
    const [isTopNavBarVisible, setIsTopNavBarVisible] = useState(false);

    return (
        <NavBarContext.Provider value={{isStudyNavBarVisible, setIsStudyNavBarVisible, isTopNavBarVisible, setIsTopNavBarVisible}}>
            {children}
        </NavBarContext.Provider>
    )
}