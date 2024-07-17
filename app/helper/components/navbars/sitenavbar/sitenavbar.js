// components/SiteNavBar.js
"use client"

import Link from 'next/link';
import React, {useContext} from 'react';
import styles from './sitenavbar.module.css'; // Assuming you use CSS Modules
import { useUser } from '../../../context/usercontext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { NavBarContext } from '../../../context/navbarcontext';


const SiteNavBar = () => {

    const { isAuthenticated, setIsAuthenticated } = useUser();
    const { isTopNavBarVisible } = useContext(NavBarContext);


    const handleLogout = () => {
        //remove the token from cookies
        Cookies.remove('token');

        setIsAuthenticated(false);
        
        
        const link = document.createElement('a');
        link.href = '/';
        document.body.appendChild(link);
        link.click();
    };

    if(!isTopNavBarVisible){
        return null;
    }

    return (
        <nav className={styles.navBar}>
            <ul className={styles.navList}>
                <li >
                    <Link href="/about" className={styles.navLink}>Our Company</Link>
                </li>

                <li >
                    <Link href="/study" className={styles.navLink}>Start Studying</Link>
                </li>


            </ul>

            <div className={styles.authButtonDiv}>
                {!isAuthenticated ? (
                    <>
                        <Link href="/login"><button className={styles.loginButton}>Log In</button></Link>
                        <Link href="/login"><button className={styles.loginButton}>Sign Up!</button></Link>
                    </>
                ) : (
                    <button className={styles.loginButton} onClick={handleLogout}>Log out</button>
                )}
            </div>

        </nav>
    );
};

export default SiteNavBar;
