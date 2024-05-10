
"use client"


import React, { useState, useEffect, useContext, use } from 'react';
import styles from './practice.module.css';
import { getQuestions, fetchFullQuestionById } from '@/app/helper/apiservices/questionservice';
import PageContent from './browsecomponents/pagecontent';
import { ansStatusData, difficultyData } from '../../helper/data/data'; // Import the data
import ParametersPanel from '../../helper/components/filter/parameterspanel';
import QuizStarter from '../../helper/components/quizstarter/quizstarter';
import PageNavigation from './browsecomponents/pagenavigation';
import { DataContext, useData } from '@/app/helper/context/datacontext';
import { Header } from '../_archive/header/header';


const PracticePage = () => {
    const [questions, setQuestions] = useState([]);
    const [numTotalQuestionsAllPages, setNumTotalQuestionsAllPages] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullQuestion, setFullQuestion] = useState(null); // State to store the full question
    const [userTier, setUserTier] = useState('free'); // Default to 'free'
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [quizStarted, setQuizStarted] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [numQuizQuestions, setNumQuizQuestions] = useState(5);

    const [sortOption, setSortOption] = useState("");
    const [displayMode, setDisplayMode] = useState("grid");

    const { loading, getTopicList } = useData();

    const [checkedTopics, setCheckedTopics] = useState([]);
    const [checkedAnsStatus, setCheckedAnsStatus] = useState(ansStatusData.flatMap(option => [option.Name, ...(option.Children || []).map(child => child.Name)]));
    const [checkedDifficulty, setCheckedDifficulty] = useState(difficultyData.flatMap(option => [option.Name, ...(option.Children || []).map(child => child.Name)]));

    useEffect(() => {
        setCheckedTopics(getTopicList("math").flatMap(option => [option.Name, ...(option.Children || []).map(child => child.Name)]));
    }, []);

    
    const loadQuestions = async ({pageSize}) => {
        try {
            const data = await getQuestions({
                selectedTopics: checkedTopics,
                selectedDifficulties: checkedDifficulty,
                unattempted: checkedAnsStatus.includes('Unattempted'),
                incorrect: checkedAnsStatus.includes('Answered Incorrectly'),
                omitted: checkedAnsStatus.includes('Omitted'),
                correct: checkedAnsStatus.includes('Answered Correctly'),
                flagged: checkedAnsStatus.includes('Flagged'),
                pageSize: pageSize,
                page: currentPage,
                sortDifficulty: sortOption === 'difficulty' ? 'asc' : sortOption === 'difficulty_desc' ? 'desc' : undefined,
                sortTopic: sortOption === 'topic' ? 'asc' : sortOption === 'topic_desc' ? 'desc' : undefined,
                sortAttemptTime: sortOption === 'attempttime' ? 'desc' : undefined
            });
            return data;
        } catch (error) {
            console.error('Could not fetch questions:', error);
        }
    };


    useEffect(() => {
        loadQuestions({ pageSize: 12 }).then(data => {
            setQuestions(data.data);
            setLastPage(data.lastPage);
            setNumTotalQuestionsAllPages(data.totalQuestions);
        });
    }, [currentPage, checkedTopics, checkedDifficulty, checkedAnsStatus, sortOption]); // Add currentPage to the dependency array

    // Function to go to the next page
    function pageSelectHandler(pageNum) {
        setCurrentPage(pageNum);
    }

    useEffect(() => {
        async function loadFullQuestion() {
            if (selectedQuestion) {
                try {
                    const data = await fetchFullQuestionById(selectedQuestion.id);
                    setFullQuestion(data);
                    setIsModalOpen(true);
                } catch (error) {
                    console.error('Could not fetch full question:', error);
                }
            }
        }

        loadFullQuestion();
    }, [selectedQuestion]);

    const handleOpenModal = (question) => {
        setSelectedQuestion(question);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedQuestion(null);
        setIsModalOpen(false);
        setFullQuestion(null); // Reset fullQuestion when closing the modal
    };

    const handleSubscribe = () => {
    };

    const handleSortChange = (sortOption) => {
        // Implement your sort logic here
    };

    const handleSubjectChange = (subject) => {
        // Implement your subject change logic here
        setActiveSubject(subject);
    }

    const handleBackButton = () => {
        setQuizStarted(false);
    }

    // Inside the return statement
    return (
        <main>
            {/* <Header text="Browse Practice Questions" /> */}
                <div className={styles.pageContent}>

                    <div className={styles.LHS}>
                       <ParametersPanel
                            checkedTopics={checkedTopics}
                            checkedAnsStatus={checkedAnsStatus}
                            checkedDifficulty={checkedDifficulty}
                            setCheckedTopics={setCheckedTopics}
                            setCheckedAnsStatus={setCheckedAnsStatus}
                            setCheckedDifficulty={setCheckedDifficulty}
                            sortOption={sortOption}
                            onSortChange={setSortOption}
                            displayMode={displayMode}
                            onDisplayModeChange={setDisplayMode}
                        />


                        <PageNavigation
                            currentPage={currentPage}
                            lastPage={lastPage}
                            pageSelectHandler={pageSelectHandler}
                        />

                        <PageContent
                            questions={questions}
                            handleOpenModal={handleOpenModal}
                            userTier={userTier}
                            displayMode={displayMode}
                            currentPage={currentPage}
                            lastPage={lastPage}
                        />

                    </div>
                </div>
            
        </main>
    );
};

export default PracticePage;

