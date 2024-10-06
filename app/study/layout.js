import React, { Suspense } from 'react';
import Head from 'next/head';
import StudyNavBar from '../helper/components/navbars/studynavbar/studynavbar';

const Layout = ({ children, title = 'Default Title' }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <main style={{ display: 'flex', height: "100vh" }}>
                <div style={{ flex: 1, width: "100%", height: "100vh", overflowY: "auto" }}>
                    <Suspense >
                        {children}
                    </Suspense>
                </div>
            </main>
        </div>
    );
};


export default Layout;
