// components/Layout.js
import React, { Suspense } from 'react';
import Head from 'next/head';
import StudyNavBar from './studynavbar';
import styles from './studyPage.module.css';
import { Loading } from '../components/loading/loading';


const Layout = ({ children, title = 'Default Title' }) => {
    return (
        <div>

            <main className={styles.bodyWithNavBar}>
                <div className={styles.StudyNavBar}>
                    <StudyNavBar />
                </div>
                <div className={styles.mainContent}>
                    <Suspense fallback={<Loading />}>
                    {children}
                    </Suspense>
                </div>

            </main>
        </div>
    );
};

export default Layout;
