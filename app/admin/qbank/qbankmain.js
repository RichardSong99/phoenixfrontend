"use client"

import React, { useState } from 'react';
import QBankForm from './qbankform';
import QuestionView from '../../helper/components/question/questionviewcomponents/questionview';
import QBankBase from './qbankbase';
import styles from './qbankmain.module.css';
import QuestionModal from '../../helper/components/question/questionviewcomponents/questionmodal';
import { Tabs, Tab } from "@nextui-org/react";
import QuestionGeneration from './questiongeneration';

const QBankMain = () => {

    const [question, setQuestion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState('practice'); // [practice, review, test, checkwork


    const handleCloseModal = () => {
        setQuestion(null);
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
                    <QBankBase
                        setQuestion={setQuestion}
                        setIsModalOpen={setIsModalOpen}
                    />
                </Tab>
                <Tab key="add" title="Add question" >
                    {/* <QBankForm
                        setQuestion={setQuestion}
                        setIsModalOpen={setIsModalOpen}
                    /> */}
                    <QuestionGeneration />
                </Tab>
            </Tabs>

            {question &&
                <QuestionModal isOpen={isModalOpen} onClose={handleCloseModal} question={question} mode={mode} />
            }

        </div>
    );
}

export default QBankMain;