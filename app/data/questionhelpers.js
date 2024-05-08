import { postEngagement } from "@/app/services/engagementservice";

export async function handlePostEngagement({
    question, userResponse, mode
}){
    try{
        const result = calculateResult({ question, userResponse });

        const engagement = {
            QuestionID: question.id,
            Mode: mode,
            UserAnswer: userResponse,
            Status: userResponse ? (result ? 'correct' : 'incorrect') : 'omitted',
            AttemptTime: new Date(),
        };

        const response = await postEngagement(engagement);
        return response;
    }catch(error){
        console.error("Error:", error);
        return null;
    }
}

export function calculateResult({
    question, userResponse
}){
    try{
        if (question.AnswerType === 'freeResponse') {
            const difference = Math.abs(parseFloat(question.CorrectAnswerFree) - parseFloat(userResponse));
            return difference <= 0.001;
        } else {
            return question.CorrectAnswerMultiple === userResponse;
        }
    }catch(error){
        console.error("Error:", error);
        return false;
    }
}

