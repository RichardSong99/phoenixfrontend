// components/QuestionModal.js
import React, { useEffect, useState } from 'react';
import QuestionView from './questionview';
import styles from './questionmodal.module.css'; // Import the CSS file
import { CheckAnswerButton } from '@/app/helper/components/question/questionpieces/questionpieces';
import { handlePostEngagement } from '../../../data/questionhelpers';
import { fetchEngagementByID } from '@/app/helper/apiservices/engagementservice';
import { fetchEngagementByQuestionID } from '@/app/helper/apiservices/engagementservice';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RadioGroup, Radio } from "@nextui-org/react";

export const QuestionModal = ({ isOpen, onOpenChange, question, initialEngagement, mode }) => {

    const [userResponse, setUserResponse] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [engagement, setEngagement] = useState(initialEngagement);

    const handleReportUserResponse = (userAnswer) => {
        setUserResponse(userAnswer);
    };

    const handleSubmitAnswer = async () => {
        setShowAnswer(true);
    }

    const initializeView = async () => {
        try {
            const fetchedEngagement = await fetchEngagementByQuestionID({ questionID: question.id });
            console.log("engagement", engagement);
            setEngagement(fetchedEngagement);
            setShowAnswer(true);
        } catch (error) {
            console.error("Error:", error);
            setUserResponse(null);
            setEngagement(null);
            setShowAnswer(false);
        }
    };

    useEffect(() => {

        console.log("question shown in modal", question)

        if (question) {
            if (!engagement) {
                initializeView();
            }
        }
    }, [question, engagement]); // Assuming you want to run this effect when `question` changes

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

