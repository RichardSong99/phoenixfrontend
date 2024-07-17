"use client"

import React, { useState, useContext } from 'react';
import QBankForm from './qbankform';
import QuestionView from '../../helper/components/question/questionviewcomponents/questionview';
import QBankBase from './qbankbase';
import styles from './qbankmain.module.css';
import { QuestionModal } from '@/app/helper/components/question/questionviewcomponents/questionmodal';
import { Tabs, Tab } from "@nextui-org/react";
import QuestionGeneration from './questiongeneration';
import { QuestionContext } from '@/app/helper/context/questioncontext';

const QBankMain = () => {

    const [question, setQuestion] = useState(null);
    const [mode, setMode] = useState('practice'); // [practice, review, test, checkwork
    const { activeViewQuestion, setActiveViewQuestion, isOpen, onOpen, onOpenChange } = useContext(QuestionContext); // State for the question being viewed

    const handleCloseModal = () => {
        setActiveViewQuestion(null);
        setIsModalOpen(false);
    }

    const uploadQuestionHandler = () => {
        console.log('question', question);
    }

    return (

        <div className="flex flex-col gap-y-4 p-4">
            {/* Your component code goes here */}

            <Tabs  aria-label="Tabs variants">
                <Tab key="database" title="Database">
                    <QBankBase/>
                </Tab>
                <Tab key="add" title="Add question" >
                 
                    <QuestionGeneration />
                </Tab>
            </Tabs>

            {activeViewQuestion &&
                <QuestionModal isOpen={isOpen} onOpenChange = {onOpenChange} question={activeViewQuestion} mode={mode} />
            }

        </div>
    );
}

export default QBankMain;