import React, { useState } from "react";

import {userMessages, assistantMessages} from "./messages";

import MessageCard from "./message-card";

export default function ChatbotConversation() {
  const [messages, updateMessages] = useState([]);
  const updateThread = () => {

    updateMessages(messages => [...messages, 
      {
        role: "user",
        message: userMessages[userMessages.length - 1],
      },
    ]);

    updateMessages(messages => [...messages, 
      {
        role: "assistant",
        message: assistantMessages[assistantMessages.length - 1],
      }
    ]);
  }

  return (
    <div className="flex flex-col gap-4 px-1">
      {messages.map(({role, message}, index) => (
        <MessageCard
          key={index}
          attempts={index === 1 ? 2 : 1}
          avatar={
            role === "assistant"
              ? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
              : "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
          }
          currentAttempt={index === 1 ? 2 : 1}
          message={message}
          messageClassName={role === "user" ? "bg-content3 text-content3-foreground" : ""}
          showFeedback={role === "assistant"}
        />
      ))}
    </div>
  );
}
