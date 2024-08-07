"use client"

import React, { useState, useRef, useEffect } from "react";

import { getChatbotResponse } from "../../apiservices/chatbotresponseservice";
import {Button} from "@nextui-org/react";

export default function Chatbot({question}) {
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([
        // {
        //     role: "user",
        //     message: "test",
        // },
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

    const updateAssistantMessages = ({ assistant_message }) => {
       
        setMessages((messages) => [
            ...messages,
            {
                role: "Assistant",
                message: assistant_message,
            }
        ]);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user_message) {
            setLoading(true);
            updateUserMessages({ user_message: user_message });
            const message = user_message;
            setUserMessage('');
            try{
                const response = await getChatbotResponse(message, question.Prompt, question.AnswerChoices, question.CorrectAnswerMultiple, question.AnswerType);
                updateAssistantMessages({ assistant_message: response});
            } catch(e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleHint = async (event) => {
        setLoading(true);
        updateUserMessages({ user_message: "Give me a hint." });
        try{
            const message = "Give me a hint.";
            const response = await getChatbotResponse(message, question.Prompt, question.AnswerChoices, question.CorrectAnswerMultiple, question.AnswerType);
            updateAssistantMessages({ assistant_message: response});
        } catch(e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSolution = async (event) => {
        setLoading(true);
        updateUserMessages({ user_message: "Explain this problem to me." });
        try{
            const message = "Explain this problem to me.";
            const response = await getChatbotResponse(message, question.Prompt, question.AnswerChoices, question.CorrectAnswerMultiple, question.AnswerType);
            updateAssistantMessages({ assistant_message: response});
        } catch(e) {
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
        <div className="w-[325px] bg-orange h-[550px] relative right-[2%] top-[6%] overflow-y-auto bg-appleGray6 p-[10px] rounded-[20px] shadow-custom">
            <div className="h-[250px] w-[100%] overflow-y-auto p-[5px] text-black rounded border border-gray-300 bg-white shadow-custom">
                <div className="w-full flex flex-col justify-end">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role}`}>
                            <strong>{msg.role}: </strong>{msg.message}
                        </div>
                    ))}
                </div>
                <div ref={messagesEndRef} />
            </div>
            <br></br>
            <div className="flex justify-between">
                <Button
                    className="w-half p-2 border border-gray-300 rounded bg-blue-500 text-white shadow-custom"
                    onClick={handleHint}
                >
                    Give me a hint
                </Button>
                <Button 
                    className="w-half p-2 border border-gray-300 rounded bg-blue-500 text-white shadow-custom"
                    onClick={handleSolution}
                >
                    Give me the solution
                </Button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    className="w-full p-2 border border-gray-300 rounded shadow-custom resize-none"
                    value={user_message}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={enterKey}
                    placeholder="Type your message to our assistant."
                />
                {loading ? <Button
                                isLoading
                                className="rounded text-white bg-blue-500 mt-2 p-2 shadow-custom"
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
                        :   <Button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded shadow-custom">
                            Send
                            </Button>}
            </form>
        </div>
    );
}