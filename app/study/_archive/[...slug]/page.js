"use client"
import React, { useState, useEffect } from 'react';
import SummaryPanel from '../../components/summarypanel/summarypanel';
import { useRouter, usePathname } from 'next/navigation'; // Update import
import { fetchQuizUnderlyingById } from '@/app/services/quizservice';
import styles from './myquizzesslug.module.css';
import { Header } from '../header/header';

export default function Page() {

    const pathname = usePathname(); // Update variable name
    const router = useRouter(); // Update variable name

    const [quizID] = pathname.split('/').slice(-1).map(part => decodeURI(part));
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [numTotal, setNumTotal] = useState(0);
    const [numCompleted, setNumCompleted] = useState(0);
    const [numCorrect, setNumCorrect] = useState(0);
    const [numIncorrect, setNumIncorrect] = useState(0);
    const [numOmitted, setNumOmitted] = useState(0);
    const [numUnattempted, setNumUnattempted] = useState(0);
    const [percentCompleted, setPercentCompleted] = useState(0.0);
    const [percentCorrect, setPercentCorrect] = useState(0.0);

    const handleClose = () => {
        router.push(`/study/myquizzes/`);
    }

    useEffect(() => {
        fetchQuizUnderlyingById({ quizID: quizID }).then(response => {
            setQuiz(response);
            setQuestions(response.Questions);
            setNumTotal(response.NumTotal);
            setNumCompleted(response.NumAnswered);
            setNumCorrect(response.NumCorrect);
            setNumIncorrect(response.NumIncorrect);
            setNumOmitted(response.NumOmitted);
            setNumUnattempted(response.NumUnattempted);
            setPercentCompleted(response.PercentAnswered);
            setPercentCorrect(response.PercentCorrect);
        });
    }, []);

    const handleBackButtonClick = () => {
        router.push(`/study/myquizzes/`);
    }



    return (
        <>
        {/* <Header text = {"Quiz Summary"}/> */}
        <div className = {styles.outerDiv}>
            <div className = {styles.mainPanel}>
            <div className = {styles.banner}>
                <h3>Quiz Summary</h3>
                <span>Review your performance on this quiz</span>
            </div>

            {/* <div className = {styles.backButton} onClick = {() => handleBackButtonClick()}>Back to All Quizzes</div> */}
            <div className = {styles.resultWrapper}>
            <div className={styles.statTileArray}>
                <StatTile label={"Number Correct"} value={numCorrect + '/' + numTotal} />
                <StatTile label={"Time Spent"} value={"0:00"} />
                <StatTile label={"Time Per Question"} value={"0:00"} />
            </div>

            {questions && <SummaryPanel
                questionEngagements={questions}
                quizID={quizID}
            />}
            </div>
            </div>
        </div>
        </>
    );
}

export function StatTile({ label, value }) {
    return (
        <div className = {styles.statTile}>
            <div className = {styles.statTileValue}>
                {value}
            </div>
            <div className = {styles.statTileLabel}>
                {label}
            </div>
        </div>
    );
}