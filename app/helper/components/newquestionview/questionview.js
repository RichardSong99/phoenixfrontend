import { QuestionContext } from '../../context/questioncontext';
import React, { use, useState, useEffect, useContext } from 'react';
import { Button, Avatar } from "@nextui-org/react";

export default function QuestionView({ review, combos }) {
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [crossedOut, setCrossedOut] = useState([]);
    const [crossOutMode, setCrossOutMode] = useState(false);

    const{
        activeQuestionIndex,
        questionData,
        // initializeEngagementStates,
    } = useContext(QuestionContext);

    const changeCrossOutMode = () => {
        setCrossOutMode(!crossOutMode);
        console.log(crossOutMode);
    };

    const handleSelect = (choice) => {
        if(!crossOutMode){
            if(!crossedOut.includes(choice)){
                setSelectedChoice(choice);
            }
        } else {
            if (crossedOut.includes(choice)) {
                setCrossedOut(crossedOut.filter(item => item !== choice));
            } else {
                if(selectedChoice === choice){
                    setSelectedChoice(null);
                }
                setCrossedOut([...crossedOut, choice]);
            }
        }
    };

    // useEffect(() => {
    //     initializeEngagementStates(combos);
    // }, []);

    return (
        <div className='mt-[20px] w-[100%] h-[515px] flex justify-center items-center'>
            <div className='bg-white h-full w-[98%] rounded shadow-custom flex flex-row justify-between pt-[20px]'>
                <div className='w-[50%]'>question display</div>
                <div className='h-[95%] w-[2px] bg-appleGray1 opacity-[10%] rounded'></div>
                <div className='w-[50%] flex flex-col justify-between'>
                    <div className='flex flex-row justify-end pr-[20px]'>
                        <div className='cursor-pointer' onClick={changeCrossOutMode}>
                            <svg
                                className={`w-[25px] h-[25px] rounded-[6px]
                                    ${crossOutMode ? 'fill-white bg-black' : 'fill-black bg-white'}`}
                                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                            >
                                <path d="M7.948 2.25h8.104c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.725c.456.456.642 1.023.726 1.65c.08.595.08 1.345.08 2.243V7.95a.75.75 0 0 1-1.5 0V7c0-.964-.002-1.612-.067-2.095c-.062-.461-.169-.659-.3-.789c-.13-.13-.327-.237-.788-.3c-.483-.064-1.131-.066-2.095-.066h-3.25V9a.75.75 0 0 1-1.5 0V3.75H8c-.964 0-1.612.002-2.095.067c-.461.062-.659.169-.789.3c-.13.13-.237.327-.3.788C4.753 5.388 4.75 6.036 4.75 7v.95a.75.75 0 1 1-1.5 0V6.948c0-.898 0-1.648.08-2.242c.084-.628.27-1.195.725-1.65c.456-.456 1.023-.642 1.65-.726c.595-.08 1.345-.08 2.243-.08m4.052 12a.75.75 0 0 1 .75.75v5.25H17a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1 0-1.5h4.25V15a.75.75 0 0 1 .75-.75m-8-3a.75.75 0 0 0 0 1.5h16a.75.75 0 0 0 0-1.5z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className='h-[450px] w-full flex flex-col gap-y-[8px] justify-center items-center'>
                        <Button 
                            className={`w-[400px] h-[50px] border-[2px] rounded-[25px] shadow-custom
                                ${selectedChoice === 'A' && !crossedOut.includes('A') ? 'bg-appleBlue text-white bg-opacity-70' : 'bg-white text-appleBlue border-appleBlue'}`}
                            onClick={() => handleSelect('A')}
                        >
                            <Avatar
                                className={`h-[30px] w-[30px] relative left-[-115px] border-[2px]
                                    ${selectedChoice === 'A' && !crossedOut.includes('A') ? 'opacity-70 bg-white border-appleGray3 text-appleBlue' : 'text-white border-appleGray6 bg-appleBlue'}`}
                                name="A"
                            />
                            Answer Choice 1
                            {/* {questionData[combos[activeQuestionIndex].QuestionID].AnswerChoices[0].Text} */}
                        </Button>
                        <div
                            className={` 
                                ${!crossedOut.includes('A') ? 'transparent' : 'relative top-[-34px] w-[420px] h-[2px] bg-black mb-[-2px] pointer-events-none'}`}
                        ></div>
                        <Button 
                            className={`w-[400px] h-[50px] border-[2px] rounded-[25px] shadow-custom
                                ${selectedChoice === 'B' ? 'bg-appleBlue text-white bg-opacity-70' : 'bg-white text-appleBlue border-appleBlue'}`}
                            onClick={() => handleSelect('B')}
                        >
                            <Avatar
                                className={`h-[30px] w-[30px] relative left-[-115px] text-white border-[2px] border-appleGray6 bg-appleBlue
                                    ${selectedChoice === 'B' ? 'opacity-70 bg-white border-appleGray3 text-appleBlue' : 'text-white border-appleGray6 bg-appleBlue'}`}
                                name="B"
                            />
                            Answer Choice 2
                        </Button>
                        <div
                            className={` 
                                ${!crossedOut.includes('B') ? 'transparent' : 'relative top-[-34px] w-[420px] h-[2px] bg-black mb-[-2px] pointer-events-none'}`}
                        ></div>
                        <Button 
                            className={`w-[400px] h-[50px] border-[2px] rounded-[25px] shadow-custom
                                ${selectedChoice === 'C' ? 'bg-appleBlue text-white bg-opacity-70' : 'bg-white text-appleBlue border-appleBlue'}`}
                            onClick={() => handleSelect('C')}
                        >
                            <Avatar
                                className={`h-[30px] w-[30px] relative left-[-115px] text-white border-[2px] border-appleGray6 bg-appleBlue 
                                    ${selectedChoice === 'C' ? 'opacity-70 bg-white border-appleGray3 text-appleBlue' : 'text-white border-appleGray6 bg-appleBlue'}`}
                                name="C"
                            />
                            Answer Choice 3
                        </Button>
                        <div
                            className={` 
                                ${!crossedOut.includes('C') ? 'transparent' : 'relative top-[-34px] w-[420px] h-[2px] bg-black mb-[-2px] pointer-events-none'}`}
                        ></div>
                        <Button 
                            className={`w-[400px] h-[50px] border-[2px] rounded-[25px] shadow-custom
                                ${selectedChoice === 'D' ? 'bg-appleBlue text-white bg-opacity-70' : 'bg-white text-appleBlue border-appleBlue'}`}
                            onClick={() => handleSelect('D')}
                        >
                            <Avatar
                                className={`h-[30px] w-[30px] relative left-[-115px] text-white border-[2px] border-appleGray6 bg-appleBlue
                                    ${selectedChoice === 'D' ? 'opacity-70 bg-white border-appleGray3 text-appleBlue' : 'text-white border-appleGray6 bg-appleBlue'}`}
                                name="D"
                            />
                            Answer Choice 4
                        </Button>
                        <div
                            className={` 
                                ${!crossedOut.includes('D') ? 'transparent' : 'relative top-[-34px] w-[420px] h-[2px] bg-black mb-[-2px] pointer-events-none'}`}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}