import { QuestionContext } from '../../context/questioncontext';
import React, { use, useState, useEffect, useContext, useRef, Component } from 'react';
import { Button, Avatar, Spinner, Tooltip, Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { parseLatexString, RenderLatex } from '../latexrender/latexrender';

export default function QuestionView({ }) {
    const [crossedOut, setCrossedOut] = useState([]);
    const [crossOutMode, setCrossOutMode] = useState(false);
    const [passage, setPassage] = useState(1);
    const answerChoices = ['A', 'B', 'C', 'D'];

    const{
        activeQuestionIndex,
        questionData,
        questionIDArray,
        userResponseData,
        handleReportUserResponse,
        activeReviewMode,
        engagementData,
    } = useContext(QuestionContext);

    const changeCrossOutMode = () => {
        setCrossOutMode(!crossOutMode);
        console.log(crossOutMode);
    };

    const changePassage = (number) => {
        setPassage(number);
    };

    const handleSelect = (choice) => {
        if(!crossOutMode){
            if(!crossedOut.includes(choice)){
                handleReportUserResponse(choice, questionIDArray[activeQuestionIndex]);
            }
        } else {
            if (crossedOut.includes(choice)) {
                setCrossedOut(crossedOut.filter(item => item !== choice));
            } else {
                if(userResponseData[questionIDArray[activeQuestionIndex]] === choice){
                    handleReportUserResponse(null, questionIDArray[activeQuestionIndex]);
                }
                setCrossedOut([...crossedOut, choice]);
            }
        }
    };

    if (!questionData || !questionData[questionIDArray[activeQuestionIndex]]) {
        return <div className='w-full h-[90%] flex flex-col justify-center items-center'>
            <Spinner />
            <p className='mt-[20px]'>Loading...</p>
        </div>;
    }

    return (
        <div className='w-[100%] h-[75%] flex justify-center items-center mt-[50px]'>
            <div className='h-full w-[98%] rounded flex flex-row justify-between pt-[20px]'>
                { questionData[questionIDArray[activeQuestionIndex]].subject === "math" ?
                    <div className='w-[50%] h-[80%] flex flex-col justify-center items-center pl-[30px] pr-[30px]'>
                        {questionData[questionIDArray[activeQuestionIndex]] && parseLatexString(questionData[questionIDArray[activeQuestionIndex]].prompt)}
                        {/* { questionData[questionIDArray[activeQuestionIndex]].graphic ?
                            questionData[questionIDArray[activeQuestionIndex]].graphic :
                            (questionData[questionIDArray[activeQuestionIndex]] && parseLatexString(questionData[questionIDArray[activeQuestionIndex]].prompt))
                        } */}
                    </div> :
                    <div className='flex flex-col items-center w-[45%] h-full'>
                        <div className='w-full h-[90%] flex flex-col justify-center items-center pl-[30px] pr-[30px] overflow-y-scroll pt-[10px] mt-[20px]'>
                            { questionData[questionIDArray[activeQuestionIndex]].text2_description ?
                            {/* <RenderMarkdown content={
                                <>
                                    { passage === 1 ?
                                        <>
                                            <i>{questionData[questionIDArray[activeQuestionIndex]].text1_description}</i>
                                            <br></br><br></br>
                                            {questionData[questionIDArray[activeQuestionIndex]].text1}
                                        </>
                                    :
                                        <>
                                            <i>{questionData[questionIDArray[activeQuestionIndex]].text2_description}</i>
                                            <br></br><br></br>
                                            {questionData[questionIDArray[activeQuestionIndex]].text2}
                                        </>
                                    }
                                </>
                            } /> */}
                                (passage === 1 ?
                                    <p className='text-[20px] max-h-full w-full text-left'>
                                        <i>This passage is adapted from Jane Austen's "Pride and Prejudice," originally published in 1813.</i>
                                        <br></br><br></br>
                                        It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.
                                        "My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"
                                        Mr. Bennet replied that he had not.
                                        "But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."
                                        Mr. Bennet made no answer.
                                        "Do not you want to know who has taken it?" cried his wife impatiently.
                                        "You want to tell me, and I have no objection to hearing it."
                                        This was invitation enough.
                                        "Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."
                                    </p>
                                :
                                    <p className='text-[20px] max-h-full w-full text-left'>
                                        <i>This passage is a test passage two</i>
                                        <br></br><br></br>
                                        Test passage 2
                                    </p>
                                ) :
                                <>
                                    <i>{questionData[questionIDArray[activeQuestionIndex]].text1_description}</i>
                                    <br></br><br></br>
                                    {questionData[questionIDArray[activeQuestionIndex]].text1}
                                </>
                            }
                        </div>
                        <div className='flex flex-row justify-around items-center w-[30%]'>
                            <div>
                                <Button onClick={() => changePassage(1)} className='bg-transparent w-[10px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <g fill="none" fillRule="evenodd">
                                            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                            <path fill="currentColor" d="M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z"></path>
                                        </g>
                                    </svg>
                                </Button>
                            </div>
                            {passage} / 2
                            <div>
                                <Button onClick={() => changePassage(2)} className='bg-transparent'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <g fill="none" fillRule="evenodd">
                                            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                            <path fill="currentColor" d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z"></path>
                                        </g>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                }
                <div className='h-[95%] w-[2px] bg-appleGray1 opacity-[10%] rounded'></div>
                <div className='w-[50%] h-[90%] flex flex-col justify-between'>
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
                        {questionData[questionIDArray[activeQuestionIndex]].answer_type === "multipleChoice" ?
                            <p>Select one of the following: </p>
                            :
                            <>
                                {questionData[questionIDArray[activeQuestionIndex]].subject === "math" ?
                                    (parseLatexString(questionData[questionIDArray[activeQuestionIndex]].prompt)) : null
                                }
                            </>
                        }
                        {questionData[questionIDArray[activeQuestionIndex]].answer_type === "multipleChoice" ?
                            <>
                                {activeReviewMode !== "review" ?
                                (
                                    answerChoices.map((choice, index) => (
                                        <div key={choice} className="relative w-full max-w-xl mx-auto">
                                            <Button 
                                                className={`w-full h-auto border-[2px] rounded-[25px] shadow-custom flex flex-row justify-start pt-[20px] pb-[20px]
                                                    ${userResponseData[questionIDArray[activeQuestionIndex]] === choice && !crossedOut.includes(choice) ? 'border-[2px] border-appleBlue bg-white' : 'bg-white border-appleGray5'}`}
                                                onClick={() => handleSelect(choice)}
                                            >
                                                <Avatar
                                                    className={`h-[30px] w-[30px] border-[2px]
                                                        ${userResponseData[questionIDArray[activeQuestionIndex]] === choice && !crossedOut.includes(choice) ? 'text-white border-appleGray6 bg-appleBlue' : 'opacity-70 bg-white border-appleGray3 text-appleBlue'}`}
                                                    name={choice}
                                                />
                                                <div className="h-full text-left ml-4 mr-2 overflow-hidden text-ellipsis break-words">
                                                    {questionData[questionIDArray[activeQuestionIndex]] && parseLatexString(questionData[questionIDArray[activeQuestionIndex]].answer_choices[index])}
                                                </div>
                                            </Button>
                                            {crossedOut.includes(choice) && (
                                                <div
                                                    className="absolute top-1/2 left-[-5%] w-[110%] h-[2px] bg-black transform -translate-y-1/2 pointer-events-none"
                                                ></div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    answerChoices.map((choice, index) => (
                                        <div key={choice} className="relative w-full max-w-xl mx-auto">
                                            <Button 
                                                className={`w-full h-auto border-[2px] rounded-[25px] shadow-custom flex flex-row justify-start pt-[20px] pb-[20px]
                                                    ${questionData[questionIDArray[activeQuestionIndex]].correct_answer_multiple === choice ? 'bg-appleGreen text-white' : userResponseData[questionIDArray[activeQuestionIndex]] === choice ? 'border-appleRed bg-white' : 'bg-white border-appleGray5'}`}
                                            >
                                                <Avatar
                                                    className={`h-[30px] w-[30px] border-[2px]
                                                        ${questionData[questionIDArray[activeQuestionIndex]].correct_answer_multiple === choice ? 'text-white bg-appleGreen' : userResponseData[questionIDArray[activeQuestionIndex]] === choice ? 'border-appleRed bg-white text-appleRed' : 'opacity-70 bg-white border-appleGray3 text-appleBlue'}`}
                                                    name={choice}
                                                />
                                                <div className="h-full text-left ml-4 mr-2 overflow-hidden text-ellipsis break-words">
                                                    {questionData[questionIDArray[activeQuestionIndex]] && parseLatexString(questionData[questionIDArray[activeQuestionIndex]].answer_choices[index])}
                                                </div>
                                            </Button>
                                            {crossedOut.includes(choice) && (
                                                <div
                                                    className="absolute top-1/2 left-[-5%] w-[110%] h-[2px] bg-black transform -translate-y-1/2 pointer-events-none"
                                                ></div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </> :
                            <>
                                {activeReviewMode !== "review" ? (
                                    <div className='w-[95%] h-[100px] flex flex-row justify-around items-center'>
                                        <div>
                                            <Tooltip
                                                className='w-[500px] h-[250px] overflow-y-auto'
                                                content={
                                                    <>
                                                        If you find more than one correct answer, enter only one answer.<br /><br />
                                                        You can enter up to 5 characters for a positive answer and up to 6 characters (including the negative sign) for a negative answer.<br /><br />
                                                        If your answer is a fraction that does not fit in the provided space, enter the decimal equivalent.<br /><br />
                                                        If your answer is a decimal that does not fit in the provided space, enter it by truncating or rounding at the fourth digit.<br /><br />
                                                        If your answer is a mixed number (such as 3 1/2), enter it as an improper fraction (7/2) or its decimal equivalent (3.5).<br /><br />
                                                        Do not enter symbols such as a percent sign, comma, or dollar sign.
                                                    </>
                                                }
                                            >
                                                <button className='rounded-0 w-[20px] h-[20px] mt-[10px]' aria-label="Info">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-[20px] pointer-events-none' viewBox="0 0 24 24">
                                                            <path d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path>
                                                        </svg>
                                                    </div>
                                                </button>
                                            </Tooltip>
                                        </div>
                                        <textarea
                                            className='w-[90%] h-[50px] resize-none rounded-[15px] border-[3px] border-appleGray6 p-[10px]'
                                            placeholder='Enter your response here...'
                                            value={userResponseData[questionIDArray[activeQuestionIndex]] || ''}
                                            onChange={(e) => handleReportUserResponse(e.target.value, questionIDArray[activeQuestionIndex])}
                                        >
                                        </textarea>
                                    </div>
                                ) : (
                                    <textarea
                                        disabled
                                        className='w-[90%] h-[50px] resize-none rounded-[15px] border-[3px] border-appleGray6 p-[10px]'
                                        value={engagementData[questionIDArray[activeQuestionIndex]].user_answer || ''}
                                    >
                                    </textarea>
                                )}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}