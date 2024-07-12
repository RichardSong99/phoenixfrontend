// components/questionView/QuestionNavPanel.js

import React from 'react';
import styles from './questionnavpanel.module.css';

const QuestionNavPanel = ({ questions, currentQuestionIndex, setCurrentQuestionIndex, onClose, userResponseArray, questionFlaggedArray, checkWorkMode, setCheckWorkMode, setShowMainQuestionView, goToCheckWorkMode }) => {
    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);

        if (checkWorkMode) {
            setCheckWorkMode(false);
            setShowMainQuestionView(true);
            onClose();
        }
    };

    const getQuestionBoxClass = (index) => {
        const classes = [styles.questionBox];


        if (userResponseArray[index] !== "" && userResponseArray[index] !== null) {
            classes.push(styles.answered);
        }

        if (questionFlaggedArray[index] === 1) {
            classes.push(styles.flagged);
        }

        return classes.join(' ');
    };

    return (

        <div className={styles.questionNavPanel} >




            <div className={styles.headerAndLegend}>
                <div className={styles.questionNavHeader}>
                    <div className={styles.legendItem}>
                        <span className={`${styles.legendBox} ${styles.answered}`}></span> <span className={styles.legendText}>Answered</span>
                    </div>

                    <div className={styles.legendItem}>
                        <span className={`${styles.legendBox} ${styles.unanswered}`}></span> <span className={styles.legendText}> Unanswered </span>
                    </div>

                    <div className={styles.legendItem}>
                        <span className={`${styles.legendBox} ${styles.flagged}`}></span> <span className={styles.legendText}>Flagged </span>
                    </div>

                </div>
            </div>
            <div className={styles.questionBoxGroup}>

                {questions.map((_, index) => (
                    <div
                        key={index}
                        className={getQuestionBoxClass(index)}
                        onClick={() => goToQuestion(index)}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>

            {!checkWorkMode && (
                <div className={styles.closeButtonContainer}>

                    <button className={styles.closeButton} onClick={goToCheckWorkMode}>
                        Review Questions
                    </button>

                    <button className={styles.closeButton} onClick={onClose}>
                        Close
                    </button>
                </div>
            )}

        </div>


    );
};

export default QuestionNavPanel;
