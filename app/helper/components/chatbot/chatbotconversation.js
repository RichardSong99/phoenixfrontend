import React, { useState } from "react";

import MessageCard from "./message-card";

export function updateMessages(user_message, assistant_message) {
  // push the user message to the list of user messages
  messages.push(
    {
      role: "user",
      message: user_message,
    }
  );

  // push the assistant response to the list of assistant messages
  messages.push(
    {
      role: "assistant",
      message: assistant_message,
    }
  );
}

export default function ChatbotConversation() {
  const messages = [
    {
      role: "user",
      message: "test",
    },
    {
      role: "assistant",
      message: "ok",
    }
  ];

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
