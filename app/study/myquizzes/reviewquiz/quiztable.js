"use client"

import React, { useState, useEffect, useContext } from 'react';
import { NavBarContext } from '@/app/helper/context/navbarcontext';
import { fetchQuizStats, fetchQECombos } from '@/app/helper/apiservices/quizservice';
import { fetchQuizUnderlyingById } from '@/app/helper/apiservices/quizservice';
import { useRouter } from "next/navigation";
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { Spinner } from '@nextui-org/react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    useDisclosure,
    Chip,
    Progress
} from "@nextui-org/react";

import { useData } from '@/app/helper/context/datacontext';

export function QuizTable() {

    const{
        setupReviewQuizMode,
    } = useContext(QuestionContext);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [activeQuiz, setActiveQuiz] = useState(null);
    const { topicMapping, quizListQuizType } = useData();

    const router = useRouter();



    const handleQuizClick = (quiz) => {
        router.push(`/study/activequiz?quizid=${quiz.id}&review=true`);
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


    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        const fetchQuizData = async () => {
            const data = await Promise.all(
                quizListQuizType.map(async (quiz) => {
                    try {
                        const quizStats = await fetchQuizStats(quiz?.id);
                        const quizQECombos = await fetchQECombos(quiz?.id);
                        const uniqueTopicNames = Array.from(new Set(quizQECombos.question_engagement_combos.map(qeCombo => qeCombo.question.topic)));
                        
                        console.log("quiz stats", quizStats);
                        console.log("quiz qe combos", quizQECombos);
                        console.log("unique topic names", uniqueTopicNames);
                        
                        return {
                            quiz,
                            quizStats,
                            uniqueTopicNames,
                        };

                        
                    } catch (error) {
                        console.log("Error fetching quiz data", error);
                        return null;
                    }
                })
            );
            setQuizData(data.filter(item => item !== null));
        };

        fetchQuizData();
    }, [quizListQuizType]);

    

    if(quizData.length === 0){
        return <div className='w-full h-[200px] flex flex-row justify-center items-center'>
            <Spinner />
            <div className='ml-[20px]'>Loading...</div>
        </div>;
    }

    return (
        <div className = "w-full">


            <Table removeWrapper aria-label="Example static collection table" className = "w-full">
                <TableHeader>
                    {/* <TableColumn>Review Quiz</TableColumn> */}
                    <TableColumn>Quiz Name</TableColumn>
                    <TableColumn>Topics</TableColumn>
                    <TableColumn width = "200">Score</TableColumn>
                    <TableColumn>Date</TableColumn>
                </TableHeader>
                <TableBody>
                    {quizData.map((item, index) => (
                        <TableRow key={index} onClick={() => handleQuizClick(item.quiz)} className = "cursor-pointer hover:bg-gray-100">
                            {/* <TableCell>
                                <Button color="success" variant="bordered" size="sm" onClick={() => handleQuizClick(item.quiz)}>
                                    Review Quiz
                                </Button>
                            </TableCell> */}
                            <TableCell>{`Quiz ${index + 1}`}</TableCell>

                            <TableCell className="flex flex-row flex-wrap gap-2">
                                {item.uniqueTopicNames.map((topic, index) => (
                                    <Chip variant="flat" key={index} size="sm" color="primary">{topic}</Chip>
                                ))}
                            </TableCell>

                            <TableCell>
                                <Progress size = "sm" label={`Score: ${item.quizStats.total_correct} / ${item.quizStats.total_questions}`} value={item.quizStats.accuracy * 100} />
                            </TableCell>

                            <TableCell>{new Date(item.quiz?.attempt_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}