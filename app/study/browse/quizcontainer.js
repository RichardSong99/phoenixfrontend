
import QuestionView from "../components/questionviewcomponents/questionview";
import { StandardButton } from "@/app/components/buttons/buttons";
import stlyes from './quizcontainer.module.css';

export const QuizContainer = ({questions , mode, handleBackButton}) => {

    return (
        <div className = {stlyes.quizContainer}>
            <StandardButton text="Back" onClick={handleBackButton} />
            <div className = {stlyes.questionViewWrapper}>
            <QuestionView 
                questions={questions}
                mode = {mode}
            />
            </div>
        </div>
    );
}

