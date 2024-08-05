import { useEffect, useState } from 'react';
import { QuestionContext } from '../../context/questioncontext';
import QuestionNavBar from './questionnavbar';
import QuestionModal from './questionmodal';
import { fetchQuiz } from '../../apiservices/quizservice';

export default function ContentViewer({ review, quizID }) {
    const [questions, setQuestions] = useState([]);
    const [quizName, setQuizName] = useState("");
    const [combos, setCombos] = useState([]);

    const handleFetchQuizData = async () => {
        const response = await fetchQuiz({ quizID });
        setCombos(response.QuestionEngagementIDCombos);
        setQuestions(response.QuestionEngagementIDCombos);
        setQuizName(response.Name);
    }

    useEffect(() => {
        handleFetchQuizData();
    }, []);

    return (
        <div className='custom-font w-screen h-screen'>
            <style jsx>{`
                @font-face {
                    font-family: 'SF Pro Display';
                    src: url('/fonts/SFProDisplay-Regular.ttf') format('truetype');
                    font-weight: normal;
                    font-style: normal;
                }

                .custom-font {
                    font-family: 'SF Pro Display', sans-serif;
                }
            `}</style>
            {questions && quizName &&
                <div className='w-screen h-screen flex flex-row'>
                    <QuestionNavBar 
                        review={review}
                        questions={questions}
                    />
                    <QuestionModal 
                        mode={"quiz"}
                        review={review}
                        quizName={quizName}
                        combos={combos}
                    />
                </div>
            }
        </div>
    )
}