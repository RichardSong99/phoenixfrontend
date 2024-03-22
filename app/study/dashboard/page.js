"use client"

import React from 'react';
import styles from './dashboard.module.css';
import { DashboardContents } from '@/app/components/dashboard/dashboard';

export default function Page() {

    return (
        <div className={styles.outerDiv}>
            <div className={styles.mainPanel}>
                {/* <Header text={"Practice Modules"} /> */}
                <div className={styles.banner}>
                    <h3>Welcome Back, Richard</h3>
                    <span>Let&apos;s get to work.</span>
                </div>

                <div className={styles.topicContainer}>
                    <DashboardContents />
                </div>
            </div>


        </div>
    )
}