// QuestionGridLayout.js
import React, { useState } from 'react';
import styles from './questionlayout.module.css';
import { parseLatexString } from '../components/latexrender/latexrender';
import { CriteriaElement } from '@/app/components/criteriabox/criteriabox';
import { colors } from '../data/colors';
import QuestionView from '../components/questionviewcomponents/questionview';
import { objectsAreEqual } from '@/app/services/comparison';
import { CSSTransition } from 'react-transition-group';
import DownIcon from '@/app/assets/components/Down-icon.svg';
import Image from 'next/image';
import { capitalizeFirstLetter } from '../data/utility';
import { useUser } from '@/app/context/usercontext';
import QuestionModal from '../components/questionviewcomponents/questionmodal';

export function useQuestionSelection() {

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

        setIsModalOpen(true);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return { selectedQuestion, showSelectedQuestion, clickQuestionHandler, isAuthenticated , isModalOpen, handleCloseModal};
}

export function QuestionGridLayout({ questions }) {

    const { selectedQuestion, showSelectedQuestion, clickQuestionHandler, isAuthenticated, isModalOpen, handleCloseModal } = useQuestionSelection();

    return (

        <div className={styles.questionsContainer}>
            {selectedQuestion && <QuestionModal question={selectedQuestion} mode={'browse'} isOpen={isModalOpen} onClose= {handleCloseModal} />}


            {questions && questions.length !== 0 && (

                <React.Fragment>

                    {/* <div className={`${styles.questionInLine} ${showSelectedQuestion ? '' : styles.collapsed}`}>
                        <p className={styles.hideQuestionText} onClick={() => clickQuestionHandler(selectedQuestion)}>Hide </p>
                    </div> */}


                    {questions.map((question, index) => (
                        <>
                            <div
                                key={index}
                                className={`${styles.questionCard} ${selectedQuestion && objectsAreEqual(question, selectedQuestion) ? styles.selectedQuestionCard : ''}`}
                                onClick={() => clickQuestionHandler(question)}
                            >
                                <p>{parseLatexString(question.Prompt)}</p>
                                <CriteriaElement text={question.Topic}></CriteriaElement>
                                <CriteriaElement text={capitalizeFirstLetter(question.Difficulty)}></CriteriaElement>
                                <CriteriaElement text={capitalizeFirstLetter(isAuthenticated ? question.Status : "unattempted")} ></CriteriaElement>
                            </div>


                        </>
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
