import React, { useState, useEffect } from 'react';
import styles from './questionview.module.css';
import MainQuestionView from './mainquestionview';
import { postEngagement } from '@/app/apiservices/engagementservice';
import { ButtonNavPanel } from '@/app/helper/components/question/questionpieces/questionpieces';
import renderMarkdownWithLaTeX from '../../latexrender/markdownwlatex';
import { calculateResult } from '../../../data/questionhelpers';


const QuestionView = ({ question, engagement, userResponseParam, markReviewParam, mode, showAnswer, handleReportUserResponse, handleReportMarkedReview, timeLeft }) => {
    const [markedReview, setMarkedReview] = useState(false);
    const [userResponse, setUserResponse] = useState(null);
    const [result, setResult] = useState(false);

    const handleFlagButtonClick = () => {
        setMarkedReview(prevFlagged => !prevFlagged);
    };
    
    useEffect(() => {
        if( typeof handleReportMarkedReview === 'function' ){
            handleReportMarkedReview(markedReview);
        }
    }, [markedReview]);

    const handleInputChange = (userFreeAnswer) => {
        setUserResponse(userFreeAnswer);
        handleReportUserResponse(userFreeAnswer);
    };

    const handleChoiceClick = (choiceLetter) => {
        setUserResponse(choiceLetter);
        handleReportUserResponse(choiceLetter);
    };


    useEffect(() => {
        if (engagement) {
            setUserResponse(engagement.UserAnswer);
            setResult(calculateResult({question: question, userResponse: engagement.UserAnswer}));
        } else if(userResponseParam){
            setUserResponse(userResponseParam);
            setResult(calculateResult({question: question, userResponse: userResponseParam}));
        } else {
            setUserResponse(null);
            setResult(false);
        }

        if (engagement) {
            setMarkedReview(engagement.Flagged);
        } else {
            setMarkedReview(markReviewParam);
        }

    }, [question, engagement, userResponseParam, markReviewParam]);


    return (
        <div className={styles.questionView}>
            <MainQuestionView
                question={question}
                userResponse={userResponse}
                setUserResponse={setUserResponse}
                handleInputChange={handleInputChange}
                handleChoiceClick={handleChoiceClick}
                markedReview={markedReview}
                handleFlagButtonClick={handleFlagButtonClick}
                showAnswer={showAnswer}
                result={result}
                timeLeft={timeLeft}
            />



            {showAnswer && (
                <div className={styles.answersection}>
                    <div>
                        {question.AnswerType === 'freeResponse' ? (
                            <div>
                                <p>Correct Answer: <span>{renderMarkdownWithLaTeX(`$${question.CorrectAnswerFree}$`)}</span></p>
                            </div>
                        ) : (
                            <div>
                                <p>Correct Answer: {question.CorrectAnswerMultiple}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        {renderMarkdownWithLaTeX(question.Explanation)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionView;