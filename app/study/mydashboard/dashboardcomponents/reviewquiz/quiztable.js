"use client"

import React, { useState, useEffect, useContext } from 'react';
import { NavBarContext } from '@/app/helper/context/navbarcontext';
import { getQuizzesForUser } from '@/app/apiservices/quizservice';
import { fetchQuizUnderlyingById } from '@/app/apiservices/quizservice';
import { useRouter } from "next/navigation";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    useDisclosure,
    Chip
} from "@nextui-org/react";

import { QuizSummaryModal } from './quizsummarymodal';
import { useData } from '@/app/helper/context/datacontext';

export function QuizTable() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [activeQuiz, setActiveQuiz] = useState(null);
    const { getTopicList } = useData();

    const router = useRouter();

    const { setIsStudyNavBarVisible, setIsTopNavBarVisible } = useContext(NavBarContext);
    const [quizIDList, setQuizIDList] = useState([]);
    const [quizList, setQuizList] = useState([]);

    useEffect(() => {
        setIsStudyNavBarVisible(true);
        setIsTopNavBarVisible(true);

        // fetch quiz list
        const fetchQuizzes = async () => {
            try {
                let response = await getQuizzesForUser();
                let quizIds = response.filter(quiz => quiz.Type === "quiz").map(quiz => quiz.id);
                setQuizIDList(quizIds);
                let quizData = await Promise.all(quizIds.map(quizID => fetchQuizUnderlyingById({ quizID: quizID })));
                setQuizList(quizData);
            } catch (error) {
                console.log("Error fetching quizzes for user", error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleQuizClick = (quiz) => {
        // router.push(`/study/myquizzes/${quizID}`);
        onOpenChange(true);
        setActiveQuiz(quiz);
        console.log(quiz, "quiz")
    }

    // Function to filter parent names based on child topic matches
    const filterParentNames = (topicsList, questionTopics) => {
        const parentNames = [];
        topicsList.forEach(parent => {
            parent.Children.forEach(child => {
                if (questionTopics.includes(child.Name)) {
                    parentNames.push(parent.Name);
                }
            });
        });
        return [...new Set(parentNames)];
    };




    return (
        <div >
            <QuizSummaryModal isOpen={isOpen} onOpenChange={onOpenChange} fullQuizData={activeQuiz} />


            <Table removeWrapper aria-label="Example static collection table" >
                <TableHeader>
                    <TableColumn>Review Quiz</TableColumn>
                    <TableColumn>Quiz Name</TableColumn>
                    <TableColumn>Topics</TableColumn>
                    {/* <TableColumn>Questions</TableColumn> */}
                    <TableColumn>Score</TableColumn>
                    <TableColumn>Date</TableColumn>
                </TableHeader>
                <TableBody>

                    {quizList && quizList.length !== 0 && (
                        quizList.map((quiz, index) => (
                            <TableRow key={index} onClick={() => handleQuizClick(quiz)}>
                                <TableCell><Button color="success" variant = "bordered" size="sm" onClick={() => handleQuizClick(quiz)}>
                                    Review Quiz
                                </Button></TableCell>
                                <TableCell>{`Quiz ${index + 1}`}</TableCell>

                                <TableCell className = "flex flex-row gap-2">
                                    {(() => {
                                        const allParentNames = quiz.Questions.flatMap(question => {
                                            const questionTopics = question.Question.Topic;
                                            const mathParentNames = filterParentNames(getTopicList("math"), questionTopics);
                                            const readingParentNames = filterParentNames(getTopicList("reading"), questionTopics);
                                            return [...mathParentNames, ...readingParentNames];
                                        });
                                        console.log(allParentNames, "allParentNames")
                                        const uniqueParentNames = Array.from(new Set(allParentNames));
                                        return uniqueParentNames.map((parentName, index) => (
                                            <Chip variant="flat" key={index} size="sm" color = "primary">{parentName}</Chip>
                                        ));
                                    })()}
                                </TableCell>
                                {/* <TableCell>{quiz?.NumTotal}</TableCell> */}
                                <TableCell>{quiz?.NumCorrect + ' / ' + quiz?.NumTotal}</TableCell>
                                <TableCell>{new Date(quiz?.Quiz?.AttemptTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>

            </Table>
        </div>
    );
}