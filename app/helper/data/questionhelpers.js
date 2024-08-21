import { postEngagement } from "@/app/helper/apiservices/engagementservice";

export async function handlePostEngagement({
    question, userResponse, mode
}){
    try{
        const result = calculateResultHelper({ question, userResponse });

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

export function getResult({ question, userResponse }) {
    if (userResponse === undefined || userResponse === null) {
        return 'omitted';
    }
    return calculateResultHelper({ question, userResponse }) ? 'correct' : 'incorrect';
}

export function calculateResultHelper({
    question, userResponse
}){
    try{
        if (question.AnswerType === 'freeResponse') {
            const difference = Math.abs(parseFloat(question.correct_answer_free) - parseFloat(userResponse));
            return difference <= 0.001;
        } else {
            return question.correct_answer_multiple === userResponse;
        }
    }catch(error){
        console.error("Error:", error);
        return false;
    }
}

export const createNewQuestion = ({
    prompt,
    text1,
    text1Description,
    text2,
    text2Description,
    graphicLatex, 
    graphicSVG, 
    graphicDescription,
    answerType,
    difficulty,
    subject,
    specificTopic,
    answerChoices,
    explanation,
    accessOption,
    correctAnswerMultiple,
    correctAnswerFree,
    uploadedImageUrls
}) => {
    const newQuestion = {
        prompt: prompt,
        text1: text1,
        text1_description: text1Description,
        text2: text2,
        text2_description: text2Description,
        graphic_latex: graphicLatex,
        graphic_svg: graphicSVG,
        graphic_description: graphicDescription,
        answer_type: answerType,
        difficulty: difficulty,
        subject: subject,
        topic: specificTopic,
        answer_choices: answerChoices,
        explanation: explanation,
        access_option: accessOption
    };

    if (answerType === 'multipleChoice') {
        newQuestion.CorrectAnswerMultiple = correctAnswerMultiple;
    } else {
        newQuestion.CorrectAnswerFree = correctAnswerFree;
    }

    newQuestion.Images = uploadedImageUrls.map((url, index) => ({
        Filename: `IMG${index}`,
        Url: url
    }));

    return newQuestion;
}
