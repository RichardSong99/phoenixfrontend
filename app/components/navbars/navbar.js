import React from 'react';
import styles from './navbar.module.css'
import { StandardButton } from '../buttons/mybuttons';

export const SiteNavBar = () => {
    return (
        <div className = {styles.siteNavBar}>
            <div>Logo</div>
            <div className = {styles.siteNavBarLinks}>
                <div className = {styles.regularLink}>About Us</div>
                <StandardButton 
                    text="Study" 
                    onClick={() => alert("You clicked me!")}
                />
                <div className = {styles.regularLink}>Login</div>
                <StandardButton 
                    text="Sign Up!" 
                    onClick={() => alert("You clicked me!")}
                />

            </div>
        </div>
    )
}

export const SideNavBar = () => {
    return (
        <div className = {styles.sideNavBar}>
            <div className = {styles.sideNavBarLinks}>
                <div className = {styles.regularSideLink}>
                    <div className= {styles.regularSideLink2}>
                    
                    
                    Browse questions</div>
                    </div>
                <div className = {styles.regularSideLink}>
                <div className= {styles.regularSideLink2}>

                    My stats</div>
                    </div>
            </div>
        </div>
    )
}