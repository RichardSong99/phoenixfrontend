import React, { useState, useEffect, useContext } from 'react';
import { QuestionContext } from '../../context/questioncontext';
import { Button } from "@nextui-org/react";
import { act } from 'react';

export default function QuestionHeader({ quizName }) {
    const [showTimer, setShowTimer] = useState(true);
    const {
        activeQuestionIndex,
        continueTimer,
        changeTimer,
        isFlaggedData,
        isStarredData,
        handleFlagQuestion,
        handleStarQuestion,
        activeReviewMode,
        timeSpentData,
        totalSeconds,
        updateTotalTimer,
        questionIDArray,
        currentSeconds,
        adaptiveRegularMode,
    } = useContext(QuestionContext);

    useEffect(() => {
        const intervalId = updateTotalTimer();
    
        return() => {
            clearInterval(intervalId);
        };
    }, [continueTimer, activeReviewMode]);

    const handleShowTimer = () => {
        setShowTimer(!showTimer);
    };

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
        <div className='w-full h-[75px] border-b-[2px] border-appleGray6'>
            <div className='w-full h-full flex flex-row justify-between'>
                {activeReviewMode === "active" ? <div id='question-actions' className='flex flex-col items-center pl-[5px] h-full w-[75px]'>
                    <div className='cursor-pointer' onClick={() => handleFlagQuestion(activeQuestionIndex)}>
                        { adaptiveRegularMode !== 'adaptive' ?
                            (!isFlaggedData[activeQuestionIndex] ? (
                                <svg
                                    className='h-[30px] w-[30px] fill-appleRed'
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3zm2-3.05l5-2.15l5 2.15V5H7zM7 5h10z"></path>
                                </svg>
                            ) : (
                                <svg
                                    className='h-[30px] w-[30px] fill-appleRed'
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"></path>
                                </svg>
                            )) : null
                        }
                    </div>
                    <div className='cursor-pointer' onClick={() => handleStarQuestion(activeQuestionIndex)}>
                        {!isStarredData[activeQuestionIndex] ? (
                            <svg
                                className='h-[30px] w-[30px] fill-appleYellow'
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 256 256"
                            >
                                <path d="M243 96a20.33 20.33 0 0 0-17.74-14l-56.59-4.57l-21.84-52.81a20.36 20.36 0 0 0-37.66 0L87.35 77.44L30.76 82a20.45 20.45 0 0 0-11.66 35.88l43.18 37.24l-13.2 55.7A20.37 20.37 0 0 0 79.57 233L128 203.19L176.43 233a20.39 20.39 0 0 0 30.49-22.15l-13.2-55.7l43.18-37.24A20.43 20.43 0 0 0 243 96m-70.47 45.7a12 12 0 0 0-3.84 11.86L181.58 208l-47.29-29.08a12 12 0 0 0-12.58 0L74.42 208l12.89-54.4a12 12 0 0 0-3.84-11.86l-42.27-36.5l55.4-4.47a12 12 0 0 0 10.13-7.38L128 41.89l21.27 51.5a12 12 0 0 0 10.13 7.38l55.4 4.47Z"></path>
                            </svg>
                        ) : (
                            <svg
                                className='h-[30px] w-[30px] fill-appleYellow'
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 256 256"
                            >
                                <path d="m234.29 114.85l-45 38.83L203 211.75a16.4 16.4 0 0 1-24.5 17.82L128 198.49l-50.53 31.08A16.4 16.4 0 0 1 53 211.75l13.76-58.07l-45-38.83A16.46 16.46 0 0 1 31.08 86l59-4.76l22.76-55.08a16.36 16.36 0 0 1 30.27 0l22.75 55.08l59 4.76a16.46 16.46 0 0 1 9.37 28.86Z"></path>
                            </svg>
                        )}
                    </div>
                </div>
                :
                <div>
                    <div id='question-actions' className='flex flex-col items-center pl-[5px] h-full w-[75px]'>
                        <div className='w-[30px] h-[30px]'></div>
                        <div className='cursor-pointer' onClick={() => handleStarQuestion(activeQuestionIndex)}>
                            {!isStarredData[activeQuestionIndex] ? (
                                <svg
                                    className='h-[30px] w-[30px] fill-appleYellow'
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 256 256"
                                >
                                    <path d="M243 96a20.33 20.33 0 0 0-17.74-14l-56.59-4.57l-21.84-52.81a20.36 20.36 0 0 0-37.66 0L87.35 77.44L30.76 82a20.45 20.45 0 0 0-11.66 35.88l43.18 37.24l-13.2 55.7A20.37 20.37 0 0 0 79.57 233L128 203.19L176.43 233a20.39 20.39 0 0 0 30.49-22.15l-13.2-55.7l43.18-37.24A20.43 20.43 0 0 0 243 96m-70.47 45.7a12 12 0 0 0-3.84 11.86L181.58 208l-47.29-29.08a12 12 0 0 0-12.58 0L74.42 208l12.89-54.4a12 12 0 0 0-3.84-11.86l-42.27-36.5l55.4-4.47a12 12 0 0 0 10.13-7.38L128 41.89l21.27 51.5a12 12 0 0 0 10.13 7.38l55.4 4.47Z"></path>
                                </svg>
                            ) : (
                                <svg
                                    className='h-[30px] w-[30px] fill-appleYellow'
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 256 256"
                                >
                                    <path d="m234.29 114.85l-45 38.83L203 211.75a16.4 16.4 0 0 1-24.5 17.82L128 198.49l-50.53 31.08A16.4 16.4 0 0 1 53 211.75l13.76-58.07l-45-38.83A16.46 16.46 0 0 1 31.08 86l59-4.76l22.76-55.08a16.36 16.36 0 0 1 30.27 0l22.75 55.08l59 4.76a16.46 16.46 0 0 1 9.37 28.86Z"></path>
                                </svg>
                            )}
                        </div>
                    </div>
                </div>}
                <div className='h-full w-[250px] flex flex-col items-center justify-center text-center mt-[5px]'>
                    <p className='text-[20px] mb-[0px]'>Question {activeQuestionIndex + 1}</p>
                    <p className='text-[15px] text-appleGray3'>{quizName}</p>
                </div>
                <div className='text-[15px] w-[500px] ml-[-440px] mr-[20px] flex flex-row justify-end items-center mt-[-15px]'>
                    {activeReviewMode === "active" ? (
                        <Button className='text-[14px] text-white rounded-[20px] h-[20px] w-[100px] bg-appleBlue text-[12px]' onClick={handleShowTimer}>
                            {showTimer ? 'Hide Timer' : 'Show Timer'}
                        </Button>) : null}
                    {showTimer ?
                        (activeReviewMode === "active" ? (
                            <>
                                <div className='flex-col w-[200px]'>
                                    <p className='mb-[5px] text-[14px] text-appleGray1 w-[200px] text-right'>Total time: {minutes}m {seconds}s</p>
                                    <p className='mb-[5px] text-[14px] w-[200px] text-right'>Current question time: {Math.floor(currentSeconds / 60)}m {Math.floor(currentSeconds % 60)}s</p>
                                    <Button
                                        className='w-[100px] h-[25px] bg-appleBlue rounded-[20px] text-white text-[12px] shadow-custom ml-[100px]'
                                        onClick={changeTimer}
                                    >
                                        {continueTimer ? 'Pause Timer' : 'Unpause Timer'}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p className='mb-[5px] text-[14px] w-[300px] text-right mt-[40px]'>Time spent on this question: {Math.floor(timeSpentData[questionIDArray[activeQuestionIndex]] / 60)}m {Math.floor(timeSpentData[questionIDArray[activeQuestionIndex]] % 60)}s</p>
                        )) : null
                    }   
                </div>
            </div>
        </div>
    );
}
