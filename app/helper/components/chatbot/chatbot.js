"use client"

import React, { useState } from "react";

import { getChatbotResponse } from "../../apiservices/chatbotresponseservice";
import { Hind_Guntur } from "next/font/google";

export default function Chatbot(question) {

    const [messages, setMessages] = useState([
        // {
        //     role: "user",
        //     message: "test",
        // },
        {
            role: "assistant",
            message: "How can I help you today?",
        }
    ]);

    const [user_message, setUserMessage] = useState('');

    const updateUserMessages = ({ user_message }) => {
       
        setMessages((messages) => [
            ...messages,
            {
                role: "user",
                message: user_message,
            },
        ]);

    };

    const updateAssistantMessages = ({ assistant_message }) => {
       
        setMessages((messages) => [
            ...messages,
            {
                role: "assistant",
                message: assistant_message,
            }
        ]);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user_message) {
            updateUserMessages({ user_message: user_message });
            const message = user_message;
            setUserMessage('');
            try{
                const response = await getChatbotResponse(message, question);
                updateAssistantMessages({ assistant_message: response});
            } catch(e) {
                console.log(e);
            }
        }
    };

    const handleHint = async (event) => {
        updateUserMessages({ user_message: "Give me a hint." });
        const message = user_message;
        setUserMessage('');
        try{
            const response = await getChatbotResponse(message, question);
            updateAssistantMessages({ assistant_message: response});
        } catch(e) {
            console.log(e);
        }
    };

    const handleSolution = async (event) => {
        updateUserMessages({ user_message: "Explain this problem to me." });
        const message = user_message;
        setUserMessage('');
        try{
            const response = await getChatbotResponse(message, question);
            updateAssistantMessages({ assistant_message: response});
        } catch(e) {
            console.log(e);
        }
    };

    const enterKey = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleSubmit(event);
        }
    };

    return (
        <div className="bg-orange h-[700px] w-[300px] relative right-[2%] top-[6%]" style={{ overflowY: 'auto'}}>
            <div className="flex-1 bg-black h-[500px] flex flex-col justify-end text-white p-[5px] w-full">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <strong>{msg.role}: </strong>{msg.message}
                    </div>
                ))}
            </div>
            <br></br>
            <div>
                <button
                    className="w-half p-2 border border-gray-300 rounded"
                    onClick={handleHint}
                >
                    Give me a hint.
                </button>
                <button 
                    className="w-half p-2 border border-gray-300 rounded"
                    onClick={handleSolution}
                >
                    Give me the solution.
                </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    value={user_message}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={enterKey}
                    placeholder="Type your message to our assistant."
                />
                <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
                    Send
                </button>
            </form>
        </div>
    );
}