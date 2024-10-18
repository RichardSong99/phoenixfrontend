import React, { useState, useEffect, useContext, useRef } from 'react';
import { QuestionContext } from '../../context/questioncontext';
import { Popover, PopoverTrigger, PopoverContent, Button, Avatar } from "@nextui-org/react";
import Draggable from 'react-draggable';
import Chatbot from '../chatbot/chatbot';
import { updateEngagement } from '../../apiservices/engagementservice';
import { parseLatexString } from '../latexrender/latexrender';

export default function QuestionFooter({ }) {
    const [isChatBotVisible, setChatBotVisible] = useState(false);
    const [isCalculatorVisible, setCalculatorVisible] = useState(false);
    const [isReferenceVisible, setReferenceVisible] = useState(false);
    const [isAnswerVisible, setAnswerVisible] = useState(false);
    const calculatorRef = useRef(null);

    const {
        questionData,
        questionIDArray,
        activeQuestionIndex,
        activeReviewMode,
        engagementIDData,
        engagementData,
        handleSubmitEngagements,
        userResponseData,
        indquizMode,
        adaptiveRegularMode,
        changeTimer,
        handleSubmitSingleEngagement,
        handleAdaptiveSubmit,
        adaptiveQuestionIndex,
        handleEndAdaptiveQuiz,
        handleNextAdaptiveButton,
    } = useContext(QuestionContext);

    const toggleChatBot = () => {
        setChatBotVisible(!isChatBotVisible);
    };

    const toggleCalculator = () => {
        setCalculatorVisible(!isCalculatorVisible);
    };

    const toggleReference = () => {
        setReferenceVisible(!isReferenceVisible);
    };

    const ChatbotIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        >
            <path d="M17.753 14a2.25 2.25 0 0 1 2.25 2.25v.904A3.75 3.75 0 0 1 18.696 20c-1.565 1.344-3.806 2-6.696 2s-5.128-.656-6.69-2a3.75 3.75 0 0 1-1.306-2.843v-.908A2.25 2.25 0 0 1 6.254 14zM11.9 2.006L12 2a.75.75 0 0 1 .743.648l.007.102l-.001.749h3.5a2.25 2.25 0 0 1 2.25 2.25v4.505a2.25 2.25 0 0 1-2.25 2.25h-8.5a2.25 2.25 0 0 1-2.25-2.25V5.75A2.25 2.25 0 0 1 7.75 3.5l3.5-.001V2.75a.75.75 0 0 1 .649-.743L12 2zM9.749 6.5a1.25 1.25 0 1 0 0 2.498a1.25 1.25 0 0 0 0-2.498m4.493 0a1.25 1.25 0 1 0 0 2.498a1.25 1.25 0 0 0 0-2.498"></path>
        </svg>
    );

    const handleShowAnswer = () => {
        if (userResponseData[questionIDArray[activeQuestionIndex]] != null) {
            setAnswerVisible(!isAnswerVisible);
            handleSubmitSingleEngagement();
        }

        if (indquizMode === "individual") {
            changeTimer();
        }
    };



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

    const handleReviewQuestion = (reason) => {
        console.log(engagementIDData[questionIDArray[activeQuestionIndex]]);
        if (!engagementData[questionIDArray[activeQuestionIndex]].reviewed) {
            updateEngagement({ engagementID: engagementIDData[questionIDArray[activeQuestionIndex]], update: { "reviewed": true } });
            updateEngagement({ engagementID: engagementIDData[questionIDArray[activeQuestionIndex]], update: { "reviewed_response": reason } });
        }
    };

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

    useEffect(() => {
        setAnswerVisible(false);
    }, [activeQuestionIndex]);

    return (
        <div className='w-full h-[10%] border-t-[2px] border-appleGray6 flex flex-row items-center pl-[20px]'>
            {activeReviewMode === "review" && engagementData[questionIDArray[activeQuestionIndex]] &&
                <div className='w-[500px] h-full flex flex-row justify-start items-center'>
                    <Popover placement="top">
                        <PopoverTrigger>
                            <Button className='rounded-[20px] bg-white border-[2px] border-themeDarkGray text-appleGray1 mr-[20px]'>
                                {engagementData[questionIDArray[activeQuestionIndex]].reviewed ?
                                    <>
                                        Reviewed
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" className='fill-appleGreen w-[20px] h-[20px] mb-[2px]'>
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M416 128L192 384l-96-96"></path>
                                        </svg> </> : "Review"
                                }
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            {(titleProps) => (
                                <div className="px-1 py-2 w-full">
                                    <p className="text-small font-bold text-foreground text-center" {...titleProps}>
                                        {engagementData[questionIDArray[activeQuestionIndex]].status === 'incorrect' || engagementData[questionIDArray[activeQuestionIndex]].status === 'omitted' ?
                                            'Why did you get this question wrong?' :
                                            'How did you feel about this question?'}
                                    </p>
                                    <div className="mt-2 flex flex-col gap-2 w-full">
                                        {engagementData[questionIDArray[activeQuestionIndex]].status === 'incorrect' || engagementData[questionIDArray[activeQuestionIndex]].status === 'omitted' ?
                                            <>
                                                <Button
                                                    className={`border-[2px] border-appleGray5 ${engagementData[questionIDArray[activeQuestionIndex]].reviewed_response === 'Guessed' ? 'bg-appleGray1' : 'bg-transparent'}`}
                                                    onClick={() => handleReviewQuestion("Guessed")}>
                                                    I guessed.
                                                </Button>
                                                <Button
                                                    className={`border-[2px] border-appleGray5 ${engagementData[questionIDArray[activeQuestionIndex]].reviewed_response === 'Misunderstood Problem' ? 'bg-appleGray1' : 'bg-transparent'}`}
                                                    onClick={() => handleReviewQuestion("Misunderstood Problem")}>
                                                    I misunderstood the problem.
                                                </Button>
                                                {questionData[questionIDArray[activeQuestionIndex]].subject === 'math' ?
                                                    <Button
                                                        className={`border-[2px] border-appleGray5 ${engagementData[questionIDArray[activeQuestionIndex]].reviewed_response === 'Computational Error' ? 'bg-appleGray1' : 'bg-transparent'}`}
                                                        onClick={() => handleReviewQuestion("Computational Error")}>
                                                        I made a computational error.
                                                    </Button> :
                                                    <Button
                                                        className={`border-[2px] border-appleGray5 ${engagementData[questionIDArray[activeQuestionIndex]].reviewed_response === 'Hard Passage' ? 'bg-appleGray1' : 'bg-transparent'}`}
                                                        onClick={() => handleReviewQuestion("Hard Passage")}>
                                                        The passage was too hard.
                                                    </Button>
                                                }
                                            </> :
                                            <>
                                                <Button
                                                    className={`border-[2px] border-appleGray5 ${engagementData[questionIDArray[activeQuestionIndex]].reviewed_response === 'Understood' ? 'bg-appleGray1' : 'bg-transparent'}`}
                                                    onClick={() => handleReviewQuestion("Understood")}>
                                                    I nailed it.
                                                </Button>
                                                <Button
                                                    className={`border-[2px] border-appleGray5 ${engagementData[questionIDArray[activeQuestionIndex]].reviewed_response === 'Guessed' ? 'bg-appleGray1' : 'bg-transparent'}`}
                                                    onClick={() => handleReviewQuestion("Guessed")}>
                                                    I guessed.
                                                </Button>
                                                <Button
                                                    className={`border-[2px] border-appleGray5 ${engagementData[questionIDArray[activeQuestionIndex]].reviewed_response === 'Inefficient' ? 'bg-appleGray1' : 'bg-transparent'}`}
                                                    onClick={() => handleReviewQuestion("Inefficient")}>
                                                    I could have done it faster.
                                                </Button>
                                            </>}
                                    </div>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                    <Popover placement="top">
                        <PopoverTrigger>
                            <Button className='text-white bg-gray-500'>
                                Explanation
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent size = "md" className = "max-w-[800px] p-3" backdrop = "opaque">
                            {parseLatexString(questionData[questionIDArray[activeQuestionIndex]].explanation)}
                        </PopoverContent>
                    </Popover>
                </div>
            }
            {activeReviewMode === "active" && <div>
                <div className="flex flex-row gap-x-[10px]">

                    <Button className='bg-white border-[2px] text-gray-600' onClick={handleShowAnswer}>
                        {!isAnswerVisible ?
                            "Check Answer" :
                            <div className='text-black pointer-events-none'>Correct Answer: {questionData[questionIDArray[activeQuestionIndex]].answer_type === "multipleChoice" ? questionData[questionIDArray[activeQuestionIndex]].correct_answer_multiple : questionData[questionIDArray[activeQuestionIndex]].correct_answer_free}</div>
                        }
                    </Button>

                    <Button className='bg-white border-[2px] text-gray-600' onClick={handleNextAdaptiveButton}>
                        Next question
                    </Button>

                    <Button className='bg-gray-400 text-white' onPress={handleEndAdaptiveQuiz}>
                        End Quiz
                    </Button>
                </div>



            </div>}
            <div className='w-full h-[50px] flex flex-row justify-end items-center pr-[20px] gap-x-[10px]'>
                <div className='cursor-pointer'>
                    <Avatar
                        classNames={{
                            icon: "h-[30px] w-[30px] fill-white",
                            base: "bg-themeDarkGray",
                        }}
                        icon={<ReferenceIcon />}
                        onClick={toggleReference}
                    />
                </div>
                <div className='cursor-pointer'>
                    <Avatar
                        classNames={{
                            icon: "h-[30px] w-[30px] fill-white",
                            base: "bg-themeDarkGray",
                        }}
                        icon={<CalculatorIcon />}
                        onClick={toggleCalculator}
                    />
                </div>
                <div className='cursor-pointer'>
                    <Avatar
                        classNames={{
                            icon: "h-[30px] w-[30px] fill-white",
                            base: "bg-themeDarkGray",
                        }}
                        icon={<ChatbotIcon />}
                        onClick={toggleChatBot}
                    />
                </div>
            </div>
            {isChatBotVisible &&
                <Draggable className='bg-black'>
                    <div className='absolute top-0 left-0 cursor-move p-[5px] w-[450px] flex flex-col items-center'>
                        <div className='w-full flex justify-start relative top-[20px] left-[20px] z-[10]'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                                className="fill-appleRed cursor-pointer"
                                onClick={toggleChatBot}
                            >
                                <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"></path>
                            </svg>
                        </div>
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
                        <div id="reference" className="bg-white w-[1000px] h-[550px] top-[25%] right-[3%] z-999 text-black rounded border border-gray-300 p-3">
                            <img
                                src="https://satsuite.collegeboard.org/media/2021-11/SAT-SG-MATH-EQ-01.jpg"
                                className="w-full h-full pointer-events-none"
                                alt="SAT Reference Sheet"
                            />
                        </div>
                    </div>
                </Draggable>
            }
        </div>
    );
}
