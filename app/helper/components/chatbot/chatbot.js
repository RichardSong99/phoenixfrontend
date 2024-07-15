"use client"

import React, { useState } from "react";

import { getChatbotResponse } from "../../apiservices/chatbotresponseservice";

export default function Chatbot(question) {

    const [messages, setMessages] = useState([
        {
            role: "user",
            message: "test",
        },
        {
            role: "assistant",
            message: "ok",
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
        if (user_message.trim()) {
            updateUserMessages({ user_message: user_message });
            const message = user_message;
            setUserMessage('');
            const response = await getChatbotResponse(message);
            updateAssistantMessages({ assistant_message: response});
        } else {
            updateMessages({ user_message: "", assistant_message: "Message failed."})
        }
    };

    const enterKey = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleSubmit(event);
        }
    };

    return (
        <div className="bg-orange h-[700px] w-[200px] relative right-[4%] top-[6%]" style={{ overflowY: 'auto'}}>
            <div className="flex-1 bg-black h-[500px] flex flex-col justify-end text-white p-[5px]">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <strong>{msg.role}: </strong>{msg.message}
                    </div>
                ))}
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