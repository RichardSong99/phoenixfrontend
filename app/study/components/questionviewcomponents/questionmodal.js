// components/QuestionModal.js
import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import QuestionView from './questionview';
import styles from './questionmodal.module.css'; // Import the CSS file
import { CheckAnswerButton } from '@/app/components/question/question';
import { handlePostEngagement } from '../../data/questionhelpers';
import { fetchEngagementByID } from '@/app/services/engagementservice';
import { fetchEngagementByQuestionID } from '@/app/services/engagementservice';

const QuestionModal = ({ isOpen, onClose, question, mode }) => {

    const [userResponse, setUserResponse] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [engagement, setEngagement] = useState(null);

    const handleReportUserResponse = (userAnswer) => {
        setUserResponse(userAnswer);
    };

    const handleSubmitAnswer = async () => {
        let response = await handlePostEngagement({question: question, userResponse: userResponse, mode: mode});
        const engagementID = response.id;
        response = await fetchEngagementByID({engagementID: engagementID});
        console.log("response after fetchEngagementByID", response);
        setEngagement(response);
        setShowAnswer(true);
    }

    useEffect(() => {
        if (question) {
            const initializeView = async () => {
                try {
                    const engagement = await fetchEngagementByQuestionID({questionID: question.id});
                    console.log("engagement", engagement);
                    setEngagement(engagement);
                    setShowAnswer(true);
                } catch(error) {
                    console.error("Error:", error);
                    setEngagement(null);
                    setShowAnswer(false);
                }
            };
    
            initializeView();
        }
    }, [question]); // Assuming you want to run this effect when `question` changes

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Question Details"
            className={styles.modal}
        >
            <div className={styles.modalcontent}>
                <button className={styles.closebutton} onClick={onClose}>X</button>
                {question && (
                    <>
                        <QuestionView
                            question={question}
                            engagement={engagement}
                            showAnswer={showAnswer}
                            mode={mode}
                            handleReportUserResponse={handleReportUserResponse}
                        />

                        <CheckAnswerButton
                            checkAnswerHandler={handleSubmitAnswer}
                            mode={mode}
                        />
                    </>
                )}
            </div>
        </Modal>
    );
};

export default QuestionModal;