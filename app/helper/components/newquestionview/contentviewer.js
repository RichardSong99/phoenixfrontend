import { useEffect, useState } from 'react';
import { QuestionContext } from '../../context/questioncontext';
import QuestionNavBar from './questionnavbar';
import QuestionModal from './questionmodal';
import { fetchQuiz } from '../../apiservices/quizservice';

export default function ContentViewer({ review, quizID, quizName }) {
    const [questions, setQuestions] = useState([]);

    const handleFetchQuizData = async () => {
        const response = await fetchQuiz({ quizID });
        setQuestions[response.QuestionEngagementIDCombos];
    }

    useEffect(() => {
        handleFetchQuizData();
    }, []);

    return (
        <div>
            {questions && 
                <div className='w-screen h-screen flex flex-row'>
                    <QuestionNavBar 
                        review={false}
                    />
                    <QuestionModal 
                        mode={"quiz"}
                        review={false}
                    />
                </div>
            }
        </div>
    )
}