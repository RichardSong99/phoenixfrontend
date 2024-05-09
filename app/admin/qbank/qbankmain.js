"use client"

import React, {useState} from 'react';
import QBankForm from './qbankform';
import QuestionView from '../../helper/components/question/questionviewcomponents/questionview';
import QBankBase from './qbankbase';
import styles from './qbankmain.module.css';
import QuestionModal from '../../helper/components/question/questionviewcomponents/questionmodal';

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

        <div className = {styles.qbankmain}>
            {/* Your component code goes here */}
            <QBankForm
                question={question}
                setQuestion={setQuestion}
                setIsModalOpen={setIsModalOpen}
                uploadQuestionHandler={uploadQuestionHandler}
            />

            {question && 
            <QuestionModal isOpen={isModalOpen} onClose={handleCloseModal} question={question} mode = {mode} />
            }

            <QBankBase 
                setQuestion={setQuestion}
                setIsModalOpen={setIsModalOpen}
            />

        </div>
    );
}

export default QBankMain;