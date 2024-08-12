"use client"

import React, { useState, useRef, useEffect, useContext } from "react";
import { getChatbotResponse } from "../../apiservices/chatbotresponseservice";
import { Button, Spinner } from "@nextui-org/react";
import { QuestionContext } from '../../context/questioncontext';
import { parseLatexString } from "../latexrender/latexrender";

export default function Chatbot() {
    const messagesEndRef = useRef(null);

    const {
        activeQuestionIndex,
        questionData,
        questionIDArray,
    } = useContext(QuestionContext);

    const [messages, setMessages] = useState([
        {
            role: "Assistant",
            message: "How can I help you?",
        }
    ]);

    const [user_message, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const updateUserMessages = ({ user_message }) => {
        setMessages((messages) => [
            ...messages,
            {
                role: "User",
                message: user_message,
            },
        ]);
    };

    const updateAssistantMessages = (newContent) => {
        setMessages((messages) => {
            const lastAssistantMessageIndex = messages.slice().reverse().findIndex(msg => msg.role === "Assistant");
            if (lastAssistantMessageIndex !== -1) {
                const indexToUpdate = messages.length - 1 - lastAssistantMessageIndex;
                const updatedMessages = [...messages];
                updatedMessages[indexToUpdate] = {
                    ...updatedMessages[indexToUpdate],
                    message: parseLatexString(newContent),
                };
                return updatedMessages;
            }
            return messages;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user_message) {
            setLoading(true);
            updateUserMessages({ user_message });
            setUserMessage('');

            setMessages((messages) => [
                ...messages,
                {
                    role: "Assistant",
                    message: <Spinner size="sm" className="relative top-[3px]"/>,
                }
            ]);

            try {
                const response = await getChatbotResponse(
                    user_message,
                    questionData[questionIDArray[activeQuestionIndex]].prompt,
                    questionData[questionIDArray[activeQuestionIndex]].answer_choices,
                    questionData[questionIDArray[activeQuestionIndex]].correct_answer_multiple,
                    questionData[questionIDArray[activeQuestionIndex]].answer_type
                );

                // Start streaming the response by updating the assistant's message
                let streamedMessage = '';
                for (let i = 0; i < response.length; i++) {
                    streamedMessage += response[i];
                    updateAssistantMessages(streamedMessage);
                    await new Promise((r) => setTimeout(r, 30)); // Adjust delay to control the speed of streaming
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleHint = async () => {
        await handleAssistantMessage("Give me a hint.");
    };

    const handleSolution = async () => {
        await handleAssistantMessage("Explain this problem to me.");
    };

    const handleAssistantMessage = async (message) => {
        setLoading(true);
        updateUserMessages({ user_message: message });

        setMessages((messages) => [
            ...messages,
            {
                role: "Assistant",
                message: <Spinner size="sm" className="relative top-[3px]"/>,
            }
        ]);

        try {
            const response = await getChatbotResponse(
                message,
                questionData[questionIDArray[activeQuestionIndex]].prompt,
                questionData[questionIDArray[activeQuestionIndex]].answer_choices,
                questionData[questionIDArray[activeQuestionIndex]].correct_answer_multiple,
                questionData[questionIDArray[activeQuestionIndex]].answer_type
            );

            // Start streaming the response by updating the assistant's message
            let streamedMessage = '';
            for (let i = 0; i < response.length; i++) {
                streamedMessage += response[i];
                updateAssistantMessages(streamedMessage);
                await new Promise((r) => setTimeout(r, 30)); // Adjust delay to control the speed of streaming
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const enterKey = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleSubmit(event);
        }
    };

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="w-[400px] bg-orange h-[600px] relative right-[2%] top-[6%] overflow-y-auto bg-white border-[2px] border-appleGray3 p-[10px] rounded-[15px] flex flex-col justify-between">
            <div className="h-[65%] w-[100%] overflow-y-auto p-[5px] text-black rounded border border-gray-300 bg-white">
                <div className="w-full flex flex-col justify-end">
                    {messages.map((msg, index) => (
                        <div key={index} className="border-[2px] rounded-[20px] py-[5px] px-[8px] mt-[5px]">
                            <div className={`message ${msg.role}`}>
                                <strong>{msg.role}: </strong>{msg.message}
                            </div>
                        </div>
                    ))}
                </div>
                <div ref={messagesEndRef} />
            </div>
            <div>
                <div className="flex justify-between">
                    <Button
                        className="w-half p-2 border border-gray-300 rounded bg-blue-500 text-white rounded-[20px] p-[20px]"
                        onClick={handleHint}
                    >
                        Give me a hint
                    </Button>
                    <Button
                        className="w-half p-2 border border-gray-300 rounded bg-blue-500 text-white rounded-[20px] p-[20px]"
                        onClick={handleSolution}
                    >
                        Give me the solution
                    </Button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded resize-none"
                        value={user_message}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={enterKey}
                        placeholder="Type your message to our assistant."
                    />
                    {loading ? (
                        <Button
                            isLoading
                            className="rounded text-white bg-blue-500 mt-2 p-2 rounded-[20px]"
                            spinner={
                                <svg
                                    className="animate-spin h-5 w-5 text-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        fill="currentColor"
                                    />
                                </svg>
                            }
                        >
                            Generating
                        </Button>
                    ) : (
                        <Button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded rounded-[20px]">
                            Send
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
}
