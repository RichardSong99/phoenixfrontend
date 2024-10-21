import React, { useEffect, useState, useContext, useRef } from 'react';
import { QuestionContext } from '../../context/questioncontext';
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { TestContext } from '@/app/study/activetest/activetestcontext';
import { Icon } from "@iconify/react";


export default function QuestionNavBar() {
    const {
        activeQuestionIndex,
        questionIDArray,
        jumpToQuestion,
        handleNextQuestion,
        handlePreviousQuestion,
        isFlaggedData,
        isStarredData,
        handleSubmitEngagements,
        activeReviewMode,
        indquizMode,
        userResponseData,
        handleUpdateTimeSpentData,
        adaptiveRegularMode,
        engagementData,
        TESTMODE
    } = useContext(QuestionContext);

    const [updatedQuestionIDArray, setUpdatedQuestionIDArray] = useState(questionIDArray);

    // Update questionIDArray whenever adaptiveQuestionIndex changes
    useEffect(() => {
        if (activeQuestionIndex !== undefined && activeQuestionIndex !== null) {
            // Update the questionIDArray based on the adaptiveQuestionIndex
            setUpdatedQuestionIDArray(questionIDArray); // No sorting or remapping, just updating
        }
    }, [activeQuestionIndex, questionIDArray]);

    const checkSelected = (index) => {
        return index === activeQuestionIndex;
    }

    const checkFlagged = (index) => {
        return isFlaggedData[index];
    }

    const checkAnswered = (index) => {
        return userResponseData[questionIDArray[index]] === null;
    }

    const questionButtonStyle = (index) => {
        let style = '';
        let borderColor = '';
        let bgColor = '';
        let textColor = '';
        let engagementStatus = engagementData[questionIDArray[index]]?.status;
        let userResponseStatus = userResponseData[questionIDArray[index]];
        let questionSelected = (index === activeQuestionIndex);

        console.log('userResponseStatus', userResponseStatus);
        console.log('indquizMode', indquizMode);

        console.log("userresponse data", userResponseData);

        if (indquizMode === TESTMODE && userResponseStatus !== null) {
            bgColor = "bg-gray-200";
        }

        if (questionSelected) {
            style += 'transform scale-[1.05] font-bold border-[2px] border-gray-600'
        } else {
            style += 'text-appleGray1 border-[2px]'
        }

        if (!(indquizMode === TESTMODE && activeReviewMode === 'active')) {
            if (engagementStatus !== undefined) {
                console.log('engagementStatus', engagementStatus);
                if (engagementStatus === 'correct') {
                    borderColor = 'border-green-500';
                } else if (engagementStatus === 'incorrect') {
                    borderColor = 'border-red-500';
                } else if (engagementStatus === 'omitted') {
                    borderColor = 'border-yellow-500';
                }

                if (questionSelected) {
                    if (engagementStatus === 'correct') {
                        bgColor = 'bg-green-500';
                    } else if (engagementStatus === 'incorrect') {
                        bgColor = 'bg-red-500';
                    } else if (engagementStatus === 'omitted') {
                        bgColor = 'bg-yellow-500';
                    }
                    textColor = 'text-white';
                } else {
                    if (engagementStatus === 'correct') {
                        textColor = 'text-green-500';
                    } else if (engagementStatus === 'incorrect') {
                        textColor = 'text-red-500';
                    } else if (engagementStatus === 'omitted') {
                        textColor = 'text-yellow-500';
                    }
                }
            } else {
                if (questionSelected) {
                    borderColor = 'border-appleGray3';
                    bgColor = 'bg-appleGray3';
                    textColor = 'text-white';
                } else {
                    borderColor = 'border-appleGray5';
                }
            }
        }

        return style + ' ' + borderColor + ' ' + bgColor + ' ' + textColor;
    }

    const handleKeyChange = (index) => {
        jumpToQuestion(index);
    }

    const router = useRouter();

    const handleSubmit = async () => {
        const response = await handleSubmitEngagements();
        router.push(`/study/myquizzes`);
    }

    return (
        <div className='h-[90%] w-[250px] bg-white relative top-[60px] left-[30px] flex flex-col justify-between items-center pt-[25px] pb-[40px] rounded-[25px] shadow-custom '>
            <div className='w-full h-full  flex flex-col items-center '>
                {/* {adaptiveRegularMode !== 'adaptive' && <div className='mb-[20px] w-[85%] h-[100px] border-t-[2px] border-b-[2px] border-solid border-appleGray6 flex flex-row flex-wrap justify-center items-center gap-x-[10px] text-[15px] text-gray-600'>
                    <div className='h-[25px] w-[25px] bg-appleGray3 rounded-[10px]'></div>
                    <p className='pt-[15px] ml-[-6px]'>Current</p>
                    <div className='h-[25px] w-[25px] rounded-[10px] border-[2px] border-dashed border-appleGray1'></div>
                    <p className='pt-[15px] ml-[-6px]'>Unanswered</p>
                    <div>
                        <svg
                            className='h-[25px] w-[25px] fill-appleRed'
                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                        >
                            <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"></path>
                        </svg>
                    </div>
                    <p className='pt-[15px] ml-[-8px]'>Flagged</p>
                </div>} */}
                <div className='w-[95%] h-full rounded-[20px]'>
                    <div className='w-full flex flex-wrap gap-[19px] items-start p-[10px]'>
                        {updatedQuestionIDArray.map((_, index) => (
                            <div
                                key={index}
                                className={`h-[40px] w-[40px] text-center items-center cursor-pointer rounded-[12px] pt-[5px]
                                ${questionButtonStyle(index)}`}
                                style={{ transition: 'transform 0.3s ease-in-out' }}
                                onClick={() => handleKeyChange(index)}
                            >
                                {isFlaggedData[questionIDArray[index]] ?
                                    <div className='relative top-[-15px] right-[-20px] mb-[-25px]'>
                                        <svg
                                            className='h-[25px] w-[25px] fill-appleRed'
                                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                                        >
                                            <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"></path>
                                        </svg>
                                    </div>
                                    : null}
                                {isStarredData[questionIDArray[index]] ?
                                    <div className='relative top-[-17px] left-[-12px] mb-[-25px]'>
                                        <svg
                                            className='h-[25px] w-[25px] fill-appleYellow'
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 256 256"
                                        >
                                            <path d="m234.29 114.85l-45 38.83L203 211.75a16.4 16.4 0 0 1-24.5 17.82L128 198.49l-50.53 31.08A16.4 16.4 0 0 1 53 211.75l13.76-58.07l-45-38.83A16.46 16.46 0 0 1 31.08 86l59-4.76l22.76-55.08a16.36 16.36 0 0 1 30.27 0l22.75 55.08l59 4.76a16.46 16.46 0 0 1 9.37 28.86Z"></path>
                                        </svg>
                                    </div>
                                    : null}
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div >
                <div className="flex flex-row gap-2">
                    <Button isIconOnly style={{ backgroundColor: "#F8F7F7" }} onClick={() => handlePreviousQuestion()}>
                        <Icon icon="mynaui:skip-back-solid" width="30" height="30" style={{ color: "#0B2149" }} />
                    </Button>
                    <Button isIconOnly onClick={() => handleNextQuestion()} style={{ backgroundColor: "#F8F7F7" }}>
                        <Icon icon="mage:next-fill" width="30" height="30" style={{ color: "#0B2149" }} />
                    </Button>
                </div>
                {/* {activeReviewMode === "active" && adaptiveRegularMode !== 'adaptive' && indquizMode === 'quiz' ?
                    <div id='buttons' className='mb-[10px] h-[100px] flex flex-col justify-around items-center'>
                        <Button
                            className='w-[150px] text-appleBlue rounded-[20px] bg-white border-[1px] border-appleBlue shadow-custom'
                            onClick={() => handleSubmit()}
                        >
                            Submit Quiz
                        </Button>
                    </div> : null
                } */}
                {/* {indquizMode === "test" && <div className='mb-[10px] mt-[-100px] h-[100px] flex flex-col justify-around items-center'>
                    <Button onClick={handleNextTestStage} className='w-[150px] text-appleBlue rounded-[20px] bg-white border-[1px] border-appleBlue shadow-custom'>Next Section</Button>
                </div>} */}
            </div>
        </div>
    )
}