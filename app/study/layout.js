"use client"

import React, { Suspense, useState } from 'react';
import Head from 'next/head';
import StudyNavBar from '../helper/components/navbars/studynavbar/studynavbar';
import Loading from '../helper/components/loading/loading';
import { DataProvider, useData } from '../helper/context/datacontext';

const Layout = ({ children, title = 'Default Title' }) => {

    const {globalLoading} = useData();

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <main style={{ display: 'flex', height: "100vh" }}>
                <div style={{ flex: 1, width: "100%", height: "100vh", overflowY: "auto" }}>
                        {globalLoading && <Loading/>}
                        
                        {!globalLoading && children}
                </div>
            </main>
        </div>
    );
};


export default Layout;
