"use client"

import React, { useState } from "react";

import ChatbotConversation from "./chatbotconversation";
import ChatbotPrompt from "./chatbotprompt";

export default function Chatbot() {

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

    const updateMessages = ({ user_message, assistant_message }) => {
       
        setMessages([
            ...messages,
            {
                role: "user",
                message: user_message,
            },
            {
                role: "assistant",
                message: assistant_message,
            }
        ]);

    };


    return (
        <div className="h-[500px] bg-black flex flex-col justify-end">
            <ChatbotConversation messages = {messages} ></ChatbotConversation>
            <ChatbotPrompt updateMessages={updateMessages}></ChatbotPrompt>
        </div>
    );
}