"use client"


import React, { useState, useEffect, useContext, use } from 'react';
import styles from './practice.module.css';
import { getQuestions, fetchFullQuestionById } from '@/app/services/questionservice';
import { ansStatusData, difficultyData } from '../../../../data/data'; // Import the data
import ParametersPanel from '../../../../components/filter/parameterspanel';
import { QuizStarter } from '../../../../components/quizstarter/quizstarter';
import { DataContext, useData } from '@/app/context/datacontext';
import { Header } from '../_archive/header/header';
import { Quiz } from '@mui/icons-material';
import { initializeQuiz } from '@/app/services/quizservice';
import { useRouter } from 'next/navigation';
import { createQueryString } from '../../../../data/utility';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RadioGroup, Radio } from "@nextui-org/react";


export const CreateQuizModal = ({ isOpen, onOpen, onOpenChange }) => {
    const router = useRouter();

    const [numTotalQuestionsAllPages, setNumTotalQuestionsAllPages] = useState(0);

    const [userTier, setUserTier] = useState('free'); // Default to 'free'
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [currentPage, setCurrentPage] = useState(1);

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

    const loadQuestions = async ({ pageSize }) => {
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
            setNumTotalQuestionsAllPages(data.totalQuestions);
        });
    }, [checkedTopics, checkedDifficulty, checkedAnsStatus]);

    const handleStartQuiz = async () => {
        // make sure questions is not length 0
        const data = await loadQuestions({ pageSize: numTotalQuestionsAllPages });
        const quizQuestions = data.data.slice(0, numQuizQuestions);
        const response = await initializeQuiz({ questionIDs: quizQuestions.map(q => q.id), quizType: 'quiz' })

        if (response.error) {
            console.error('Could not initialize quiz:', response.error);
            return;
        }

        router.push(`/study/activequiz/${response.quizID}/0`);
    };


    // Inside the return statement
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inner"} size = "3xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Create a Quiz
                        </ModalHeader>
                        <ModalBody>


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

                                <QuizStarter
                                    activeNumQuestions={numQuizQuestions}
                                    setActiveNumQuestions={setNumQuizQuestions}
                                    handleStartQuiz={handleStartQuiz}
                                    numQuestionsAvailable={numTotalQuestionsAllPages}
                                />

                            </div>
                        </ModalBody>
                        {/* <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter> */}
                    </>
                )}
            </ModalContent>

        </Modal>
    );
};


