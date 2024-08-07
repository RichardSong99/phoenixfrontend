"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Update import
import styles from './quizsummary.module.css';
import QBankTable from '@/app/helper/components/qbank/qbankview/qbanktable';

export function QuizSummary({ fullQuizData }) {

    const pathname = usePathname(); // Update variable name
    const router = useRouter(); // Update variable name

    return (
        <>
            {/* <Header text = {"Quiz Summary"}/> */}
            <div className={styles.outerDiv}>


                {/* <div className = {styles.backButton} onClick = {() => handleBackButtonClick()}>Back to All Quizzes</div> */}
                <div className={styles.resultWrapper}>
                    <div className={styles.statTileArray}>
                        <StatTile label={"Number Correct"} value={fullQuizData?.NumCorrect + '/' + fullQuizData?.NumTotal} />
                        <StatTile label={"Time Spent"} value={"0:00"} />
                        <StatTile label={"Time Per Question"} value={"0:00"} />
                    </div>

                    {fullQuizData?.Questions && <QBankTable questionEngagementCombos={fullQuizData?.Questions} />}
                  
                </div>
            </div>

        </>
    );
}

export function StatTile({ label, value }) {
    return (
        <div className={styles.statTile}>
            <div className={styles.statTileValue}>
                {value}
            </div>
            <div className={styles.statTileLabel}>
                {label}
            </div>
        </div>
    );
}