import { QuestionContext } from '../../context/questioncontext';
import QuestionView from './questionview';
import QuestionHeader from './questionheader';
import AnswerBox from './answerbox';
import Chatbot from '../chatbot/chatbot';

export default function QuestionModal({ mode, review, question }) {
    return (
        <div className='bg-gray-200 w-[955px] h-[90%] relative top-[40px] left-[80px]'>
            <p>question modal</p>
            {review ? <Chatbot /> : null}
        </div>
    )
}