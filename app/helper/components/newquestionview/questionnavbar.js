import React, { useEffect, useState, useContext, useRef } from 'react';
import { QuestionContext } from '../../context/questioncontext';
import {Button, Listbox, ListboxItem} from "@nextui-org/react";
import { fetchEngagementByID } from '../../apiservices/engagementservice';

export default function QuestionNavBar({ review, questions, quizName }) {
    const{
        activeQuestionIndex,
        jumpToQuestion,
        // isFlaggedData,
        handleflagQuestion,
    } = useContext(QuestionContext);

    /* test cases, will implement QuestionContext and delete these */
    const [isFlaggedData, setIsFlaggedData] = useState([false, false, true, false, false]);
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
        <div className='h-[90%] w-[250px] bg-appleGray6 relative top-[40px] left-[50px] flex flex-col justify-between items-center pt-[25px] pb-[50px] rounded-[25px]'>
            <h5 className='w-[80%] h-[30px] text-center'>{quizName}</h5>
            <div className='w-[85%] h-[100px] border-t-[2px] border-b-[2px] border-solid border-appleGray5 flex flex-row flex-wrap justify-center items-center gap-x-[10px] text-[15px]'>
                <div className='h-[25px] w-[25px] bg-appleBlue rounded-[10px]'></div>
                <p className='pt-[15px] ml-[-6px]'>Current</p>
                <div className='h-[25px] w-[25px] rounded-[10px] border-[2px] border-dashed'></div>
                <p className='pt-[15px] ml-[-6px]'>Unanswered</p>
                <div>
                    <svg className='h-[25px] w-[25px] fill-red-1000 opacity-70' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"></path></svg>
                </div>
                <p className='pt-[15px] ml-[-8px]'>Flagged</p>
            </div>
            <div className='w-full flex flex-wrap gap-[23px] items-start p-[10px]'>                    
                {questions.map((_, index) => (
                    <div
                        key={index}
                        className={`h-[40px] w-[40px] text-center text-appleBlue cursor-pointer rounded-[12px] pt-[5px]
                            ${checkSelected(index) ? 'transform scale-[1.05] bg-appleBlue text-white' : 'bg-white text-appleBlue'}
                            ${!checkAnswered(index) ? 'border-[3px] border-dashed' : 'pt-[8px]'}
                        `}
                        style={{ transition: 'transform 0.3s ease-in-out' }}
                        onClick={() => handleKeyChange(index)}
                    >
                        {index + 1}
                        {checkFlagged(index) ?
                            <div className='relative top-[-5px] right-[-10px]'>
                                <svg className='h-[25px] w-[25px] fill-red-1000 opacity-70' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"></path></svg>
                            </div>
                        : null}
                    </div>
                ))}
            </div>
            {!review ? 
                <div id='buttons' className='mb-[10px] h-[100px] flex flex-col justify-around items-center'>
                    <Button className='w-[150px] bg-appleBlue rounded-[20px] text-white'>
                        Pause Timer
                    </Button>
                    <Button className='w-[150px] text-appleBlue rounded-[20px] bg-white border-[1px] border-appleBlue'>
                        Submit Quiz
                    </Button>
                </div> : null
            }
        </div>
    )
}