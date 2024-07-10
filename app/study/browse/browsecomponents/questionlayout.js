// QuestionGridLayout.js
import React, { useState } from 'react';
import styles from './questionlayout.module.css';
import { parseLatexString } from '../../../helper/components/latexrender/latexrender';
import { CriteriaElement } from '@/app/helper/components/criteriabox/criteriabox';
import { colors } from '../../../helper/data/colors';
import QuestionView from '../../../helper/components/question/questionviewcomponents/questionview';
import { objectsAreEqual } from '@/app/helper/apiservices/comparison';
import { CSSTransition } from 'react-transition-group';
import DownIcon from '@/app/helper/assets/components/Down-icon.svg';
import Image from 'next/image';
import { capitalizeFirstLetter } from '../../../helper/data/utility';
import { useUser } from '@/app/helper/context/usercontext';
import { QuestionModal}  from '../../../helper/components/question/questionviewcomponents/questionmodal';
import { QuestionCard } from '../../../helper/components/question/questioncard/questioncard';
import { useDisclosure } from '@nextui-org/react';

export function useQuestionSelection() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { isAuthenticated } = useUser();

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showSelectedQuestion, setShowSelectedQuestion] = useState(false);

    const clickQuestionHandler = (question) => {
        setSelectedQuestion(question);

        if (objectsAreEqual(question, selectedQuestion)) {
            setShowSelectedQuestion(!showSelectedQuestion);
        } else {
            setShowSelectedQuestion(true);
        }

        onOpen();

    }

    return { selectedQuestion, showSelectedQuestion, clickQuestionHandler, isAuthenticated , isOpen, onOpen, onOpenChange};
}

export function QuestionGridLayout({ questions }) {

    const { selectedQuestion, showSelectedQuestion, clickQuestionHandler, isAuthenticated, isOpen, onOpen, onOpenChange } = useQuestionSelection();

    return (

        <div className={styles.questionsContainer}>
            {selectedQuestion && <QuestionModal question={selectedQuestion} mode={'browse'} isOpen={isOpen} onOpenChange= {onOpenChange} />}


            {questions && questions.length !== 0 && (

                <React.Fragment>

                    {/* <div className={`${styles.questionInLine} ${showSelectedQuestion ? '' : styles.collapsed}`}>
                        <p className={styles.hideQuestionText} onClick={() => clickQuestionHandler(selectedQuestion)}>Hide </p>
                    </div> */}


                    {questions.map((question, index) => (
                            <QuestionCard clickQuestionHandler = {clickQuestionHandler} question={question} key = {index} selected = {selectedQuestion && objectsAreEqual(question, selectedQuestion)}/>
                    ))}

                </React.Fragment>
            )}

            {(!questions || questions.length === 0) && <p> No questions found</p>}

        </div>




    );
}


export function QuestionTableLayout({ questions }) {

    const { selectedQuestion, showSelectedQuestion, clickQuestionHandler, isAuthenticated } = useQuestionSelection();


    return (
        <React.Fragment>
            {questions && questions.length !== 0 && (
                <table className={styles.questionsTable}>
                    <thead>
                        <tr>
                            <th>Prompt</th>
                            <th>Topic</th>
                            <th>Difficulty</th>
                            <th>Status</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <>
                                <tr key={index}>
                                    <td><div className={styles.cellContent}>{parseLatexString(question.Prompt)}</div></td>
                                    <td><div className={styles.cellContent}><CriteriaElement text={question.Topic} /></div></td>
                                    <td><div className={styles.cellContent}><CriteriaElement text={capitalizeFirstLetter(question.Difficulty)} /></div></td>
                                    <td><div className={styles.cellContent}><CriteriaElement text={capitalizeFirstLetter(isAuthenticated ? question.Status : "unattempted")} /></div></td>
                                    <td><Image src={DownIcon} className={styles.downIcon} onClick={() => clickQuestionHandler(question)} />  </td>
                                </tr>
                                {objectsAreEqual(selectedQuestion, question) &&
                                    <div className={`${styles.questionInLine} ${showSelectedQuestion ? '' : styles.collapsed}`}>

                                        <QuestionView question={selectedQuestion} mode={'browse'} />
                                    </div>
                                }

                            </>
                        ))}
                    </tbody>
                </table>
            )}
            {(!questions || questions.length === 0) && <p> No questions found</p>}
        </React.Fragment>
    );
}
