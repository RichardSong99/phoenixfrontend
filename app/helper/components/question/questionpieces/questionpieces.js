import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './questionpieces.module.css'
import renderMarkdownWithLaTeX from '@/app/helper/components/latexrender/markdownwlatex';
import { RoundButton } from '../../../../_archive/buttons/mybuttons';
import FlaggedIcon from '@/app/helper/assets/components/Flagged.svg';
import UnflaggedIcon from '@/app/helper/assets/components/Unflagged.svg';
import Image from 'next/image';
import {Icon} from "@iconify/react";

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
    const [isCalculatorOpen, setCalculatorOpen] = useState(false);
    const calculatorRef = useRef(null);
    const handleOpenCalculator = () => {
        const calculator = document.getElementById("calculator");
        setCalculatorOpen(true);
        calculator.classList.remove("invisible");
    }

    const handleCloseCalculator = () => {
        const calculator = document.getElementById("calculator");
        setCalculatorOpen(false);
        calculator.classList.add("invisible");
    }
    const handleOpenReference = () => {
        const reference = document.getElementById("reference");
        reference.classList.remove("invisible");
    }

    const handleCloseReference = () => {
        const reference = document.getElementById("reference");
        reference.classList.add("invisible");
    }
    useEffect(() => {
        if (isCalculatorOpen) {
            if (!document.getElementById('desmos-script')) {
                const script = document.createElement('script');
                script.src = "https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
                script.id = 'desmos-script';
                script.async = true;
                script.onload = () => {
                    const elt = document.getElementById('calculator');
                    if (elt) {
                        calculatorRef.current = Desmos.GraphingCalculator(elt);
                    }
                };
                document.body.appendChild(script);
            } else {
                const elt = document.getElementById('calculator');
                if (elt) {
                    calculatorRef.current = Desmos.GraphingCalculator(elt);
                }
            }
        } else {
            if (calculatorRef.current) {
                calculatorRef.current.destroy();
                calculatorRef.current = null;
            }
        }
    }, [isCalculatorOpen]);


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
                    onClick={handleOpenCalculator}
                >
                    Calculator
                </button>
                <button 
                    className={styles.questionHeaderButton}
                    onClick={handleOpenReference}
                >
                    Reference
                </button>
            </div>

            <div id="calculator" className="invisible absolute bg-white w-[500px] h-[350px] top-[25%] right-[3%] z-999 text-black rounded border border-gray-300 p-3">
                <button
                    className="absolute top-0 right-0"
                    onClick={handleCloseCalculator}
                >
                    <Icon
                        icon="ic:round-close"
                        width="20"
                        height="20"
                    ></Icon>
                </button>
            </div>
            <div id="reference" className="invisible absolute bg-white w-[500px] h-[350px] top-[25%] right-[3%] z-999 text-black rounded border border-gray-300 p-3">
                <img src="./sat_reference_sheet.jpg"></img>
                <button
                    className="absolute top-0 right-0"
                    onClick={handleCloseReference}
                >
                    <Icon
                        icon="ic:round-close"
                        width="20"
                        height="20"
                    ></Icon>
                </button>
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