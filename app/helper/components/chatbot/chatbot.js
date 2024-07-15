import ChatbotConversation from "./chatbotconversation";
import ChatbotPrompt from "./chatbotprompt";

export default function Chatbot(){

    return (
        <div className="h-[500px] bg-black flex flex-col justify-end">
            <ChatbotConversation></ChatbotConversation>
            <ChatbotPrompt></ChatbotPrompt>
        </div>
    );
}