import React, { useState } from "react";
import styles from './quizstarter.module.css';

export const QuizStarter = ({ activeNumQuestions, setActiveNumQuestions, numQuestionsAvailable, handleStartQuiz }) => {


    const handleButtonClick = (num) => {
        setActiveNumQuestions(num);
    }



    return (
        <div className={styles.container}>
            <div className={styles.numberQuestionsWrapper}>

                {/* <NumberChoiceButtons
                    buttonTextArray={[5, 10, 15, 20]}
                    activeButton={activeNumQuestions}
                    handleButtonClick={handleButtonClick}
                /> */}
                <span className={styles.text}>Choose number of questions for quiz</span>

            </div>
            <div className={styles.numberQuestionsWrapper}>
                <div className = {styles.startButton} onClick={handleStartQuiz}>Start Quiz</div>

                <span className={styles.text}>{numQuestionsAvailable} questions available based on selected filter</span>

            </div>
        </div>

    );
}
