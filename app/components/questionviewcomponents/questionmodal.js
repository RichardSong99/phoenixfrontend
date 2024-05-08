// components/QuestionModal.js
import React, { useEffect, useState } from 'react';
import QuestionView from './questionview';
import styles from './questionmodal.module.css'; // Import the CSS file
import { CheckAnswerButton } from '@/app/components/question/fullquestion/question';
import { handlePostEngagement } from '../../data/questionhelpers';
import { fetchEngagementByID } from '@/app/services/engagementservice';
import { fetchEngagementByQuestionID } from '@/app/services/engagementservice';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RadioGroup, Radio } from "@nextui-org/react";

export const QuestionModal = ({ isOpen, onOpen, onOpenChange, question, mode }) => {

    const [userResponse, setUserResponse] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [engagement, setEngagement] = useState(null);

    const handleReportUserResponse = (userAnswer) => {
        setUserResponse(userAnswer);
    };

    const handleSubmitAnswer = async () => {
        // let response = await handlePostEngagement({question: question, userResponse: userResponse, mode: mode});
        // const engagementID = response.id;
        // response = await fetchEngagementByID({engagementID: engagementID});
        // console.log("response after fetchEngagementByID", response);
        // setEngagement(response);
        setShowAnswer(true);
    }

    useEffect(() => {
        if (question) {
            const initializeView = async () => {
                try {
                    const engagement = await fetchEngagementByQuestionID({ questionID: question.id });
                    console.log("engagement", engagement);
                    setEngagement(engagement);
                    setShowAnswer(true);
                } catch (error) {
                    console.error("Error:", error);
                    setUserResponse(null);
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
            onOpenChange={onOpenChange}
            scrollBehavior={"inner"}
            size="3xl"
        >
            <ModalContent style={{ padding: '10px' }}>
                <ModalBody>
                    {question && (
                        <>
                            <QuestionView
                                question={question}
                                engagement={engagement}
                                showAnswer={showAnswer}
                                mode={mode}
                                handleReportUserResponse={handleReportUserResponse}
                            />


                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => handleSubmitAnswer()} color="primary">
                        Submit Answer
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    );
};

