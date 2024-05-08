import React, { useEffect, useState, useContext } from 'react';
import QBankFilter from '../../components/questionbank/qbankfilter';
import { fetchMaskedQuestions, fetchFullQuestionById, getQuestions, deleteQuestion as deleteQuestionService } from '../../services/questionservice';
import styles from './qbankbase.module.css';
import { QuestionContext } from '@/app/context/questioncontext';
import { parseLatexString } from '../../components/latexrender/latexrender';
import renderMarkdownWithLaTeX from '../../components/latexrender/markdownwlatex';
import PageNavigation from '../../study/browse/browsecomponents/pagenavigation';
import QbankTable from './qbanktable';
import { NumberChoiceButtons, SubjectButton } from '@/app/components/buttons/mybuttons';

const QBankBase = ({setIsModalOpen, setQuestion}) => {

    const [questions, setQuestions] = useState([]);
    const { questionsUpdated, setQuestionsUpdated } = useContext(QuestionContext);
    const {editQuestion, setEditQuestion} = useContext(QuestionContext); // State for the question being edited
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [activeSubjectButton, setActiveSubjectButton] = useState("Math"); // Default to 'Math'
    const [activeSubject, setActiveSubject] = useState("math"); // Default to 'Math'


    

    const pageSelectHandler = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        async function loadQuestions() {
            try {
                const data = await getQuestions({
                    unattempted: true,
                    incorrect: true,
                    omitted: true,
                    correct: true,
                    flagged: true,
                    page: currentPage,
                    subject: activeSubject
                });
                setQuestions(data.data);
                setCurrentPage(data.currentPage);
                setLastPage(data.lastPage);
                setIsFetching(false);
            } catch (error) {
                console.error('Could not fetch questions:', error);
            }
        }

        loadQuestions();
    }, [questionsUpdated, currentPage, activeSubject]);

    const deleteQuestion = async (questionId) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            // Your delete logic goes here
            try {
                await deleteQuestionService(questionId);
                setQuestionsUpdated(!questionsUpdated);
            } catch (error) {
                console.error('Could not delete question:', error);
            }

        }
    }

    const handleEdit = async (questionId) => {
        try {
            const question = await fetchFullQuestionById(questionId);
            setEditQuestion(question);
        }catch(error){
            console.error('Could not fetch full question:', error);
        }
    }
    


    const viewQuestion =async  (questionId) => {
        try{
        const viewQuestion = await fetchFullQuestionById(questionId);
        setQuestion(viewQuestion);
        setIsModalOpen(true);
        }catch(error){
            console.error('Could not fetch full question:', error);
        }

    }

    return (
        <div>
            {/* Your component code goes here */}
            <div>
                <h1>Question Bank Database</h1>
            </div>

            <SubjectButton
                activeSubject = {activeSubject}
                handleSubjectChange = {setActiveSubject}
            />

            <QBankFilter />

            <QbankTable/>

            <PageNavigation currentPage={currentPage} lastPage={lastPage} pageSelectHandler={pageSelectHandler} />



            <div className={styles.questionsContainer}>
                <table className={styles.questionTable}>
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Prompt</th>
                            <th>Topic</th>
                            <th>Difficulty</th>
                            <th>Access Option</th>
                            <th>Answer Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <tr key={index}>
                                <td>
                                <button className={styles.deleteButton} onClick={() => deleteQuestion(question.id)}>Delete</button>
                                    <button className={styles.button} onClick={() => handleEdit(question.id)}>Edit</button>
                                    <button className={styles.button} onClick={() => viewQuestion(question.id)}>View</button>


                                </td>
                                <td>{renderMarkdownWithLaTeX(question.Prompt)}</td>
                                <td>{question.Topic}</td>
                                <td>{question.Difficulty}</td>
                                <td>{question.AccessOption}</td>
                                <td>{question.AnswerType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>

    );
}

export default QBankBase;