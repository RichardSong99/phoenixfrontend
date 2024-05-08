import React from 'react';
import classNames from 'classnames';
import styles from './question.module.css'
import renderMarkdownWithLaTeX from '@/app/study/components/latexrender/markdownwlatex';
import { RoundButton } from '../buttons/mybuttons';
import FlaggedIcon from '@/app/assets/components/Flagged.svg';
import UnflaggedIcon from '@/app/assets/components/Unflagged.svg';
import Image from 'next/image';

export const QuestionChoiceArea = ({ answerChoiceArray, correctAnswer, showAnswer, userAnswer, setUserAnswer }) => {
    const choiceLetters = ["A", "B", "C", "D"];

    return (
        <div className={styles.questionChoiceArea}>
            {answerChoiceArray.map((answerChoice, index) => {
                const choiceLetter = choiceLetters[index];
                const isSelected = userAnswer === choiceLetter;
                const isCorrect = correctAnswer === choiceLetter;

                const choiceComponentClass = classNames({
                    [styles.choiceComponent]: true,
                    [styles.selectedChoiceComponent]: !showAnswer && isSelected,
                    [styles.correctChoiceComponent]: showAnswer && isCorrect,
                    [styles.incorrectChoiceComponent]: showAnswer && isSelected && !isCorrect,
                });

                const choiceLetterClass = classNames({
                    [styles.choiceLetter]: true,
                    [styles.selectedChoiceLetter]: !showAnswer && isSelected,
                    [styles.correctChoiceLetter]: showAnswer && isCorrect,
                    [styles.incorrectChoiceLetter]: showAnswer && isSelected && !isCorrect,
                });

                return (
                    <div
                        key={index}
                        className={choiceComponentClass}
                        onClick={() => !showAnswer && setUserAnswer(choiceLetter)}
                    >
                        <div className={choiceLetterClass}>{choiceLetter}</div>
                        <div className={styles.choiceText}>{renderMarkdownWithLaTeX(answerChoice)}</div>
                    </div>
                )
            })}
        </div>
    )
}

export const QuestionHeader = ({ handleFlagButtonClick, questionFlagged, timeLeft }) => {
    return (
        <div className={styles.questionHeaderContainer}>
            <div className={styles.flagContainer}>
                <Image
                    src={questionFlagged ? FlaggedIcon : UnflaggedIcon}
                    onClick={handleFlagButtonClick}
                    className={styles.flagIcon}
                />
                <span className={styles.flagText}> Mark for Review</span>
            </div>
            
            {!isNaN(timeLeft) && timeLeft > 0 && <div className={styles.timerContainer}>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>}
            {(!timeLeft || isNaN(timeLeft)) && <div className={styles.timerContainer}>0:00</div>}

            <div className={styles.questionHeaderButtonArea}>
                <button
                    className={styles.questionHeaderButton}
                    onClick={() => window.open('https://www.desmos.com/calculator', '_blank')}
                >
                    Calculator
                </button>
                <button className={styles.questionHeaderButton}>Reference</button>
            </div>
        </div>
    )
}

export const ButtonNavPanel = ({ totalQuestions, setActiveQuestionIndex, currentQuestionIndex, goToPrevQuestion, goToNextQuestion, seeResultsHandler, checkAnswerHandler, isSessionOver, mode }) => {
    return (
        <div className={styles.navAreaContainer}>
            {(mode !== "browse") && (<div className={styles.navButtonArea}>
                <NavNumberButtonArea
                    totalQuestions={totalQuestions}
                    setActiveQuestionIndex={setActiveQuestionIndex}
                    currentQuestionIndex={currentQuestionIndex}
                />

                <div className={styles.nextPrevButtonGroup}>
                    <button className={styles.nextPrevButton} disabled={currentQuestionIndex === 0} onClick={goToPrevQuestion}>
                        Back
                    </button>
                    <button className={styles.nextPrevButton} onClick={goToNextQuestion}>
                        Next
                    </button>
                </div>
            </div>)}

            <div className={styles.navButtonArea}>
                {(mode === "browse" || mode === "practice") && <div className={styles.showAnswerButton} onClick={checkAnswerHandler}>
                    Show answer
                </div>}

            </div>

        </div>
    )
}

export const NavNumberButtonArea = ({ totalQuestions, setActiveQuestionIndex, currentQuestionIndex }) => {
    console.log("current question index", currentQuestionIndex);
    return (
        <div className={styles.navNumberButtonArea}>
            {Array.from({ length: totalQuestions }, (_, i) => i).map((questionNumber) => (
                <RoundButton
                    key={questionNumber}
                    isActive={questionNumber === currentQuestionIndex}
                    onClick={() => setActiveQuestionIndex(questionNumber)}
                    text={questionNumber + 1}
                />
            ))}
        </div>
    );
}



export const CheckAnswerButton = ({ checkAnswerHandler, mode }) => {
    return (
        <div className={styles.navAreaContainer}>

            <div className={styles.navButtonArea}>
                {(mode === "browse" || mode === "practice") && <div className={styles.showAnswerButton} onClick={checkAnswerHandler}>
                    Show answer
                </div>}
            </div>

        </div>
    )
}