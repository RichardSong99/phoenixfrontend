import { getChatBotResponse } from "../../apiservices/chatbotresponseservice";

export async function updateMessages(user_message){
  // get the response from the chatbot
  const response = getChatBotResponse(user_message);

  // push the user message to the list of user messages
  userMessages.push(user_message);

  // push the assistant response to the list of assistant messages
  assistantMessages.push(response)
}

export const assistantMessages = [
    
  ];
  
  export const userMessages = [
    
  ];
  