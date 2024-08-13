// components/QuestionModal.js
import React, { useEffect, useState, useContext } from 'react';
import QuestionView from './questionview';
import QuestionModalInterior from '../../newquestionview/questionmodalinterior';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RadioGroup, Radio } from "@nextui-org/react";
import { QuestionContext } from '@/app/helper/context/questioncontext';

export const QuestionModal = ({ isOpen, onOpenChange, pendingQuestion, mode, review }) => {

    const {
        activeQuestionIndex,
        questionIDArray, 
        questionData,
        userResponseData,
        isFlaggedData,
        isStarredData,
        wasReviewedData,
        timeSpentData,
        activeReviewMode,
        handleSubmitEngagements
    } = useContext(QuestionContext);


    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior={"inner"}
            size="full"
        >
            <ModalContent className='bg-transparent flex items-center'>
                {!pendingQuestion && <QuestionModalInterior
                    mode={'single'}
                />}
            </ModalContent>

        </Modal>
    );
};

