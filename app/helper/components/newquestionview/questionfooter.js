import React, { useState, useEffect, useContext, useRef } from 'react';
import { QuestionContext } from '../../context/questioncontext';
import { Popover, PopoverTrigger, PopoverContent, Button, Avatar } from "@nextui-org/react";
import Draggable from 'react-draggable';
import Chatbot from '../chatbot/chatbot';
import referenceImage from './sat_reference_sheet.jpg';

export default function QuestionFooter({ }) {
    const [isChatBotVisible, setChatBotVisible] = useState(false);
    const [isCalculatorVisible, setCalculatorVisible] = useState(false);
    const [isReferenceVisible, setReferenceVisible] = useState(false);
    const calculatorRef = useRef(null);

    const {
        questionData,
        questionIDArray,
        activeQuestionIndex,
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

    return (
        <div className='w-full h-[10%] border-t-[2px] border-appleGray6 flex flex-row items-center pl-[20px]'>
            <div>
                <Popover placement="top">
                    <PopoverTrigger>
                        <Button className='rounded-[20px] bg-white border-[2px] border-appleBlue text-appleGray1'>
                            Review
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        {(titleProps) => (
                            <div className="px-1 py-2 w-full">
                                <p className="text-small font-bold text-foreground" {...titleProps}>
                                Why did you get this question wrong?
                                </p>
                                <div className="mt-2 flex flex-col gap-2 w-full">
                                    <Button className='border-[2px] border-appleGray5 bg-transparent'>I guessed.</Button>
                                    <Button className='border-[2px] border-appleGray5 bg-transparent'>I misunderstood the problem.</Button>
                                    { questionData[questionIDArray[activeQuestionIndex]].subject === 'math' ?
                                    <Button className='border-[2px] border-appleGray5 bg-transparent'>I made a computational error.</Button> :
                                    <Button className='border-[2px] border-appleGray5 bg-transparent'>The passage was too hard.</Button>
                                    }
                                </div>
                            </div>
                        )}
                    </PopoverContent>
                </Popover>
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
    );
}
