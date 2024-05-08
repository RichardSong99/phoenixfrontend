import React, { Suspense } from 'react';
import Head from 'next/head';
import StudyNavBar from '../components/studynavbar/studynavbar';
import { Loading } from '../components/loading/loading';

const Layout = ({ children, title = 'Default Title' }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <main style={{ display: 'flex', height: "100vh" }}>
                <StudyNavBar style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: "250px" }} />
                <div style={{ flex: 1, width: "100%", height: "100vh", overflowY: "auto" }}>
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                </div>
            </main>
        </div>
    );
};


export default Layout;
