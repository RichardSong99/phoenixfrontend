import React, { useEffect, useState, useContext, useRef } from 'react';
import { QuestionContext } from '../../context/questioncontext';
import {Button} from "@nextui-org/react";
import { fetchEngagementByID } from '../../apiservices/engagementservice';

export default function QuestionNavBar({ review, questions }) {
    const{
        activeQuestionIndex,
        jumpToQuestion,
        handleNextQuestion,
        handlePreviousQuestion,
        isFlaggedData,
        handleSubmitEngagements,
    } = useContext(QuestionContext);

    /* test cases, will implement QuestionContext and delete these */
    const [isAnswered, setIsAnswered] = useState([true, false, false, true, false]);

    const checkSelected = (index) => {
        return index === activeQuestionIndex;
    }

    const checkFlagged = (index) => {
        return isFlaggedData[index];
    }

    const checkAnswered = (index) => {
        return isAnswered[index];
    }

    const handleKeyChange = (index) => {
        jumpToQuestion(index);
    }

    const getEngagement = async (index) => {
        const question = questions[index];
        const response = await fetchEngagementByID({ engagementID: question.EngagementID });
        console.log(response.Status);
        return response.Status;
    }

    return (
        <div className='h-[90%] w-[250px] bg-appleGray6 relative top-[40px] left-[30px] flex flex-col justify-between items-center pt-[25px] pb-[40px] rounded-[25px] shadow-custom'>
            <div className='w-full h-[80%] flex flex-col items-center'>
                <div className='mb-[20px] w-[85%] h-[100px] border-t-[2px] border-b-[2px] border-solid border-appleGray5 flex flex-row flex-wrap justify-center items-center gap-x-[10px] text-[15px]'>
                    <div className='h-[25px] w-[25px] bg-appleBlue rounded-[10px] shadow-custom'></div>
                    <p className='pt-[15px] ml-[-6px]'>Current</p>
                    <div className='h-[25px] w-[25px] rounded-[10px] border-[2px] border-dashed shadow-custom'></div>
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
                </div>
                <div className='bg-white w-[95%] h-full rounded-[20px] shadow-custom'>
                    <div className='w-full flex flex-wrap gap-[19px] items-start p-[10px]'>                    
                        {questions.map((_, index) => (
                            <div
                                key={index}
                                className={`h-[40px] w-[40px] text-center text-appleBlue cursor-pointer rounded-[12px] pt-[5px] shadow-custom
                                    ${checkSelected(index) ? 'transform scale-[1.05] bg-appleBlue text-white' : 'bg-white text-appleBlue'}
                                    ${!checkAnswered(index) ? 'border-[3px] border-dashed' : 'pt-[8px]'}
                                `}
                                style={{ transition: 'transform 0.3s ease-in-out' }}
                                onClick={() => handleKeyChange(index)}
                            >
                                {checkFlagged(index) ?
                                    <div className='relative top-[-15px] right-[-20px] mb-[-25px]'>
                                        <svg
                                            className='h-[25px] w-[25px] fill-appleRed'
                                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                                        >
                                            <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"></path>
                                        </svg>
                                    </div>
                                : null}
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mb-[-30px]'>
                <div className='mb-[-10px]'>
                    <Button className='h-[30px] text-white rounded-[20px] bg-appleBlue shadow-custom' onClick={() => handlePreviousQuestion()}>
                        Prev
                    </Button>
                    <Button className='h-[30px] text-white rounded-[20px] bg-appleBlue shadow-custom ml-[5px]' onClick={() => handleNextQuestion(questions.length)}>
                        Next
                    </Button>
                </div>
                {!review ? 
                    <div id='buttons' className='mb-[10px] h-[100px] flex flex-col justify-around items-center'>
                        <Button
                            className='w-[150px] text-appleBlue rounded-[20px] bg-white border-[1px] border-appleBlue shadow-custom'
                            onClick={() => handleSubmitEngagements()}
                        >
                            Submit Quiz
                        </Button>
                    </div> : null
                }
            </div>
        </div>
    )
}