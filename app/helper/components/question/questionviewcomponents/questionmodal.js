// components/QuestionModal.js
import React, { useEffect, useState } from 'react';
import QuestionView from './questionview';
import styles from './questionmodal.module.css'; // Import the CSS file
import { CheckAnswerButton } from '@/app/helper/components/question/questionpieces/questionpieces';
import { handlePostEngagement } from '../../../data/questionhelpers';
import { fetchEngagementByID } from '@/app/helper/apiservices/engagementservice';
import { fetchEngagementByQuestionID } from '@/app/helper/apiservices/engagementservice';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RadioGroup, Radio } from "@nextui-org/react";
import { QuestionContext } from '@/app/helper/context/questioncontext';

export const QuestionModal = ({ isOpen, onOpenChange, pendingQuestion, mode }) => {

    const {
        activeQuestionIndex,
        questionIDArray, 
        questionData,
        userResponseData,
        isFlaggedData,
        isStarredData,
        wasReviewedData,
        timeElapsedData,
        activeReviewMode
    } = useContext(QuestionContext);


    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior={"inner"}
            size="3xl"
        >
            <ModalContent style={{ padding: '10px' }}>
                <ModalBody>
                    <>
                        {pendingQuestion && <QuestionView
                            question={pendingQuestion}
                            userResponse={null}
                            isFlagged={false}
                            isStarred={false}
                            wasReviewed={false}
                            timeElapsed={0}
                            activeReviewMode={mode}
                        />}

                        {!pendingQuestion && <QuestionView
                            question={questionData[questionIDArray[activeQuestionIndex]]}
                            userResponse={userResponseData[questionIDArray[activeQuestionIndex]]}
                            isFlagged={isFlaggedData[questionIDArray[activeQuestionIndex]]}
                            isStarred={isStarredData[questionIDArray[activeQuestionIndex]]}
                            wasReviewed={wasReviewedData[questionIDArray[activeQuestionIndex]]}
                            timeElapsed={timeElapsedData[questionIDArray[activeQuestionIndex]]}
                            activeReviewMode={activeReviewMode}
                        />}
                    </>
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

