import { QuestionContext } from '../../context/questioncontext';
import QuestionView from './questionview';
import QuestionHeader from './questionheader';
import AnswerBox from './answerbox';
import Chatbot from '../chatbot/chatbot';

export default function QuestionModal({ mode, review, quizName, question, quizID }) {
    return (
        <div 
            className='bg-appleGray6 shadow-custom rounded-[25px] pt-[25px] h-[90%] relative top-[40px] left-[60px]' style={{width: 'calc(100% - 350px)'}}
        >
            <QuestionHeader
                quizName={quizName}
            />
            <AnswerBox />
            <QuestionView
                mode={mode}
                quizID={quizID}
            />
            {review ? <Chatbot /> : null}
        </div>
    )
}