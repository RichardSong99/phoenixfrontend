export const assistantMessages = [
    "test",
];
  
export const userMessages = [
    
];

export async function updateMessages(user_message, assistant_message){
  // push the user message to the list of user messages
  userMessages.push(user_message);

  // push the assistant response to the list of assistant messages
  assistantMessages.push(assistant_message);
}