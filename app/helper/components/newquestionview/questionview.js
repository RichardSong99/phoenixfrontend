import { QuestionContext } from '../../context/questioncontext';
import React, { use, useState, useEffect, useContext, useRef } from 'react';
import { Button, Avatar, Spinner } from "@nextui-org/react";
import Draggable from 'react-draggable';
import Chatbot from '../chatbot/chatbot';
import referenceImage from './sat_reference_sheet.jpg';
import { fetchQuiz } from '../../apiservices/quizservice';
import { fetchFullQuestionById } from '../../apiservices/questionservice';
import { parseLatexString } from '../latexrender/latexrender';

export default function QuestionView({ review, mode, quizID, topic }) {
    const [crossedOut, setCrossedOut] = useState([]);
    const [crossOutMode, setCrossOutMode] = useState(false);
    const [isChatBotVisible, setChatBotVisible] = useState(false);
    const [isCalculatorVisible, setCalculatorVisible] = useState(false);
    const [isReferenceVisible, setReferenceVisible] = useState(false);
    const calculatorRef = useRef(null);
    const answerChoices = ['A', 'B', 'C', 'D'];

    const{
        activeQuestionIndex,
        questionData,
        questionIDArray,
        userResponseData,
        handleReportUserResponse,
        activeReviewMode,
    } = useContext(QuestionContext);

    /* for testing, will delete later */
    // const [questionData, setQuestionData] = useState({});

    const toggleChatBot = () => {
        setChatBotVisible(!isChatBotVisible);
    };

    const toggleCalculator = () => {
        setCalculatorVisible(!isCalculatorVisible);
    };

    const toggleReference = () => {
        setReferenceVisible(!isReferenceVisible);
    };

    const changeCrossOutMode = () => {
        setCrossOutMode(!crossOutMode);
        console.log(crossOutMode);
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

    const ChatbotIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        >
          <path d="M17.753 14a2.25 2.25 0 0 1 2.25 2.25v.904A3.75 3.75 0 0 1 18.696 20c-1.565 1.344-3.806 2-6.696 2s-5.128-.656-6.69-2a3.75 3.75 0 0 1-1.306-2.843v-.908A2.25 2.25 0 0 1 6.254 14zM11.9 2.006L12 2a.75.75 0 0 1 .743.648l.007.102l-.001.749h3.5a2.25 2.25 0 0 1 2.25 2.25v4.505a2.25 2.25 0 0 1-2.25 2.25h-8.5a2.25 2.25 0 0 1-2.25-2.25V5.75A2.25 2.25 0 0 1 7.75 3.5l3.5-.001V2.75a.75.75 0 0 1 .649-.743L12 2zM9.749 6.5a1.25 1.25 0 1 0 0 2.498a1.25 1.25 0 0 0 0-2.498m4.493 0a1.25 1.25 0 1 0 0 2.498a1.25 1.25 0 0 0 0-2.498"></path>
        </svg>
    );

    const CalculatorIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        >
            <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 2v4h10V4zm0 6v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm-8 4v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm-8 4v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z"></path>
        </svg>
    );

    const ReferenceIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        >
            <path d="M13 9V3.5L18.5 9M6 2c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"></path>
        </svg>
    );

    // useEffect(() => {
    //     const setupData = async () => {
    //         const quiz = await fetchQuiz({ quizID });
    //         const loadedQuestionData = {};

    //         for (let i = 0; i < quiz.QuestionEngagementIDCombos.length; i++) {
    //             const question = await fetchFullQuestionById(quiz.QuestionEngagementIDCombos[i].QuestionID);
    //             loadedQuestionData[i] = question;
    //         }

    //         setQuestionData(loadedQuestionData);
    //         console.log(loadedQuestionData);
    //     };
    //     setupData();
    // }, []);

    useEffect(() => {
        if (isCalculatorVisible) {
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
    }, [isCalculatorVisible]);

    if (!questionData || !questionData[questionIDArray[activeQuestionIndex]]) {
        return<div className='w-full h-[90%] flex flex-col justify-center items-center'>
            <Spinner />
            <p className='mt-[20px]'>Loading...</p>
        </div>;
    }

    return (
        <div className='mt-[20px] w-[100%] h-[82%] flex justify-center items-center'>
            <div className='h-full w-[98%] rounded flex flex-row justify-between pt-[20px]'>
                { questionData[questionIDArray[activeQuestionIndex]].subject === "math" ?
                    <div className='w-[50%] h-[80%] flex flex-col justify-center items-center pl-[30px] pr-[30px]'>
                        {questionData[questionIDArray[activeQuestionIndex]] && parseLatexString(questionData[questionIDArray[activeQuestionIndex]].prompt)}
                    </div> :
                    <div className='w-[45%] h-[80%] flex flex-col justify-center items-center pl-[30px] pr-[30px] overflow-y-scroll pt-[10px] mt-[20px]'>
                        {/* {questionData[questionIDArray[activeQuestionIndex]].text} */}
                        <p className='text-[20px] max-h-full'>
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
                    </div>
                }
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
                        {questionData[questionIDArray[activeQuestionIndex]].answer_type === "multipleChoice" ?
                            <p>Select one of the following: </p>
                            :
                            <>
                                {questionData[questionIDArray[activeQuestionIndex]].subject !== "math" ?
                                    (questionData[questionIDArray[activeQuestionIndex]].prompt) : null
                                }
                                <p className='mt-[20px]'>Please enter your response here: </p>
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
                                    <textarea
                                        className='w-[90%] h-[150px] resize-none rounded-[15px] border-[3px] border-appleGray6 p-[10px]'
                                        placeholder='Enter your response here...'
                                    >
                                    </textarea>
                                ) : (
                                    <textarea
                                        disabled
                                        className='w-[90%] h-[150px] resize-none rounded-[15px] border-[3px] border-appleGray6 p-[10px]'
                                    >
                                        {questionData[questionIDArray[activeQuestionIndex]].user_response}
                                    </textarea>
                                )}
                            </>
                        }
                    </div>
                    <div className='w-full h-[50px] flex flex-row justify-end items-center pr-[20px] gap-x-[10px]'>
                        <div className='cursor-pointer'>
                            <Avatar
                                classNames={{
                                    icon: "h-[30px] w-[30px] fill-white",
                                    base: "bg-appleBlue",
                                }}
                                icon={<ReferenceIcon/>}
                                onClick={toggleReference}
                            />
                        </div>
                        <div className='cursor-pointer'>
                            <Avatar
                                classNames={{
                                    icon: "h-[30px] w-[30px] fill-white",
                                    base: "bg-appleBlue",
                                }}
                                icon={<CalculatorIcon/>}
                                onClick={toggleCalculator}
                            />
                        </div>
                        <div className='cursor-pointer'>
                            <Avatar
                                classNames={{
                                    icon: "h-[30px] w-[30px] fill-white",
                                    base: "bg-appleBlue",
                                }}
                                icon={<ChatbotIcon/>}
                                onClick={toggleChatBot}
                            />
                        </div>
                    </div>
                    {isChatBotVisible &&
                        <Draggable className='bg-black'>
                            <div className='absolute top-0 left-0 cursor-move'>
                                <Chatbot />
                            </div>
                        </Draggable>
                    }
                    {isCalculatorVisible &&
                        <Draggable className='bg-black' cancel='#calculator'>
                            <div className='absolute top-0 left-0 cursor-move rounded-[15px] bg-white border border-gray-300 p-[15px] shadow-custom'>
                                <div id="calculator" className="w-[800px] h-[500px] top-[25%] right-[3%] z-999 text-black">
                                </div>
                            </div>
                        </Draggable>
                    }
                    {isReferenceVisible &&
                        <Draggable className='bg-black'>
                            <div className='absolute top-0 left-0 cursor-move shadow-custom'>
                                <div id="reference" className="bg-white w-[500px] h-[350px] top-[25%] right-[3%] z-999 text-black rounded border border-gray-300 p-3">
                                    <img
                                        src={referenceImage}
                                        alt="Reference Sheet"
                                        className='w-full h-full'
                                    ></img>
                                </div>
                            </div>
                        </Draggable>
                    }
                </div>
            </div>
        </div>
    )
}