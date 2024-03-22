// components/StudyNavBar.js
"use client"
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import styles from './studynavbar.module.css';
import { NavBarContext } from '../context/navbarcontext';
import { useRouter } from 'next/navigation';

const StudyNavBar = () => {
    console.log("hello world")
    const router = useRouter()

    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        if (router.pathname) {
            setCurrentPath(router.pathname.split('/').pop());
        }
    }, []);

    const handleLinkClick = (path) => {
        setCurrentPath(path);
        router.push(`/study/${path}`);
        console.log('currentPath', currentPath);
    };

    const isActive = (pathname) => {
        return currentPath === pathname;
    };

    const { isStudyNavBarVisible } = useContext(NavBarContext);


    if (!isStudyNavBarVisible) {
        return null;
    }

    return (
        <div className={styles.studyNavbar}>
            <div className={styles.navGroup}>
                {/* <div className={styles.navText}>Math topics</div> */}
                <div className={`${styles.navItem} ${isActive('dashboard') ? styles.activeNavItem : ''}`} onClick={() => handleLinkClick('dashboard')}>
                    <span >Dashboard</span>
                </div>
                <div className={`${styles.navItem} ${isActive('practicemodule') ? styles.activeNavItem : ''}`} onClick={() => handleLinkClick('practicemodule')}>
                    <span >Practice Modules</span>
                </div>

                <div className={`${styles.navItem} ${isActive('lessonmodule') ? styles.activeNavItem : ''}`} onClick={() => handleLinkClick('lessonmodule')}>
                    <span >Lesson Modules</span>
                </div>

                <div className={`${styles.navItem} ${isActive('browse') ? styles.activeNavItem : ''}`} onClick={() => handleLinkClick('browse')}>
                    <span >Browse QBank</span>
                </div>

                <div className={`${styles.navItem} ${isActive('createquiz') ? styles.activeNavItem : ''}`} onClick={() => handleLinkClick('createquiz')}>
                    <span >Create Quiz</span>
                </div>
                <div className={`${styles.navItem} ${isActive('myquizzes') ? styles.activeNavItem : ''}`} onClick={() => handleLinkClick('myquizzes')}>
                    <span >My Quizzes</span>
                </div>
                <div className={`${styles.navItem} ${isActive('practicetest') ? styles.activeNavItem : ''}`} onClick={() => handleLinkClick('practicetest')}>
                    <span >Practice Test</span>
                </div>
                
               
            </div>

            <div className={styles.navGroup}>

                <div className={styles.navText}>Reading topics</div>
            </div>
            <div className={styles.navGroup}>

                <div className={styles.navText}>More resources</div>

                

                <div className={`${styles.navItem} ${isActive('qbank') ? styles.activeNavItem : ''}`} onClick={() => handleLinkClick('qbank')}>
                    <span >Admin: QBank</span>
                </div>
            </div>


        </div>
    );
};

export default StudyNavBar;
