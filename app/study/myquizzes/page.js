"use client"

import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../components/header/header';
import styles from './myquizzes.module.css';
import { NavBarContext } from '@/app/context/navbarcontext';
import { getQuizzesForUser } from '@/app/services/quizservice';
import { fetchQuizUnderlyingById } from '@/app/services/quizservice';
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();

    const { setIsStudyNavBarVisible, setIsTopNavBarVisible } = useContext(NavBarContext);
    const [quizIDList, setQuizIDList] = useState([]);
    const [quizList, setQuizList] = useState([]);

    useEffect(() => {
        setIsStudyNavBarVisible(true);
        setIsTopNavBarVisible(true);

        // fetch quiz list
        const fetchQuizzes = async () => {
            try {
                let response = await getQuizzesForUser();
                let quizIds = response.filter(quiz => quiz.Type === "quiz").map(quiz => quiz.id);
                setQuizIDList(quizIds);
                let quizData = await Promise.all(quizIds.map(quizID => fetchQuizUnderlyingById({ quizID: quizID })));
                setQuizList(quizData);
            } catch (error) {
                console.log("Error fetching quizzes for user", error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleQuizClick = (quizID) => {
        router.push(`/study/myquizzes/${quizID}`);
    }




    return (
        <div className={styles.outerDiv}>
            <div className={styles.mainPanel}>
                {/* <Header text={"My Quizzes"} /> */}
                <div className={styles.banner}>
                    <h3>MY QUIZZES</h3>
                    <span>View your quiz history and performance</span>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.myQuizTable}>
                        <thead>
                            <tr>
                                <th>Quiz Name</th>
                                <th>Questions</th>
                                <th>Score</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        {quizList && quizList.length !== 0 && (
                            <tbody>
                                {quizList.map((quiz, index) => {
                                    return (
                                        <tr key={index} onClick={() => handleQuizClick(quiz?.Quiz?.id)}>
                                            <td>{`Quiz ${index + 1}`}</td>
                                            <td>{quiz?.NumTotal}</td>
                                            <td>{quiz?.NumCorrect + ' / ' + quiz?.NumTotal}</td>
                                            <td>{new Date(quiz?.Quiz?.AttemptTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
}