import { QuestionContext } from '../../context/questioncontext';
import QuestionView from './questionview';
import QuestionHeader from './questionheader';
import AnswerBox from './answerbox';
import QuestionFooter from './questionfooter';

export default function QuestionModalInterior({ mode, quizID }) {
    return (
        <div 
            className='shadow-custom bg-white rounded-[25px] pt-[25px] h-[90%] relative top-[60px] left-[60px] flex flex-col justify-between pb-[0px]' style={{width: 'calc(100% - 350px)'}}
        >
            <div className='h-[85%]'>
                <QuestionHeader
                />
                <AnswerBox />
                <QuestionView
                    mode={mode}
                    quizID={quizID}
                />
            </div>
            <QuestionFooter />
        </div>
    )
}