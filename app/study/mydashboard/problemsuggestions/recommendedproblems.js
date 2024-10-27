import React, { useState, useEffect, useContext } from "react";
import { CircularProgress, Card, CardBody, CardFooter, Chip, Divider, CardHeader, Button, Spinner } from "@nextui-org/react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label, LabelList } from 'recharts';
import { useData } from "@/app/helper/context/datacontext";
import { getQuestions } from "@/app/helper/apiservices/questionservice";
import { parseLatexString } from "@/app/helper/components/latexrender/latexrender";
import { QuestionContext } from "@/app/helper/context/questioncontext";

export function RecommendedProblems() {
    const [questionData, setQuestionData] = useState([]);

    const {
        viewQuestionModal,
    } = useContext(QuestionContext);

    useEffect(() => {
        const getRecommendedProblems = async () => {
            const response = await getQuestions({selectedAnswerStatuses: ['unattempted'], pageSize: 12});
            setQuestionData(response.data);
            console.log(response.data);
        };
        getRecommendedProblems();
    }, []);

    const truncatePrompt = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + " ...";
        }
        return text;
    };

    function formatDifficulty(difficulty) {
        return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }

    function formatAnswerType(answerType) {
        if (answerType === 'multipleChoice') {
            return 'Multiple Choice';
        } else if (answerType === 'freeResponse') {
            return 'Free Response';
        }
        return answerType;
    }

    const loadMore = async () => {
        const response = await getQuestions({selectedAnswerStatuses: ['unattempted'], pageSize: 8});
        setQuestionData([...questionData, ...response.data]);
    }

    if(!questionData) {
        return <div className='w-full h-[200px] flex flex-row justify-center items-center'>
            <Spinner />
            <div className='ml-[20px]'>Loading suggested problems...</div>
        </div>;
    }

    return (
        <div className="flex flex-row flex-wrap w-[98%] justify-around">
            {questionData.map(
                (question, index) => {
                    const difficulty = question?.Question?.difficulty;
                    let backgroundColor = '';

                    if (difficulty === 'easy') {
                        backgroundColor = 'bg-[#0FAF89]';
                    } else if (difficulty === 'medium') {
                        backgroundColor = 'bg-[#FFB341]';
                    } else if (difficulty === 'hard' || difficulty === 'extreme') {
                        backgroundColor = 'bg-[#FF414C]';
                    }

                    return (
                        <div key = {index} onClick={() => viewQuestionModal({ questionId: question.Question.id })}
                        className={`px-[20px] py-[10px] rounded-[15px] w-[300px] h-[150px] bg-gradient-to-br from-[#FFFFFF] to-[#EAF4FF]
                        flex flex-col justify-between items-center cursor-pointer mb-[10px] text-[12px] text-black text-center shadow-custom`}>
                            <div className="h-[75%] flex flex-col justify-around items-center">
                                <div className="w-[full] h-[20px]">{parseLatexString(truncatePrompt(question.Question.prompt, 8))}</div>
                                <div className={`text-center text-[12px] rounded font-bold ${backgroundColor} text-white px-[10px] py-[2px]`}><strong>{formatDifficulty(question.Question.difficulty)}</strong></div>
                            </div>
                            <div className="text-center w-full h-[25%]">{formatAnswerType(question.Question.topic)}</div>
                        </div>
                    )
                }
            )}
            <div className="w-full flex flex-row justify-center mt-[10px]">
                <div className="border-[2px] px-[20px] py-[5px] rounded-[25px] cursor-pointer text-[12px]" onClick={loadMore}>
                    Load More
                </div>
            </div>
        </div>
    );
}

export function RecentProblems() {
    const [questionData, setQuestionData] = useState([]);

    const {
        viewQuestionModal,
    } = useContext(QuestionContext);

    useEffect(() => {
        const getRecommendedProblems = async () => {
            const response = await getQuestions({selectedAnswerStatuses: ['correct', 'incorrect'], pageSize: 12});
            setQuestionData(response.data);
            console.log(response.data);
        };
        getRecommendedProblems();
    }, []);

    const truncatePrompt = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + " ...";
        }
        return text;
    };

    function formatDifficulty(difficulty) {
        return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }

    function formatAnswerType(answerType) {
        if (answerType === 'multipleChoice') {
            return 'Multiple Choice';
        } else if (answerType === 'freeResponse') {
            return 'Free Response';
        }
        return answerType;
    }

    const loadMore = async () => {
        const response = await getQuestions({selectedAnswerStatuses: ['correct', 'incorrect'], pageSize: 8});
        setQuestionData([...questionData, ...response.data]);
    }

    if(!questionData) {
        return <div className='w-full h-[200px] flex flex-row justify-center items-center'>
            <Spinner />
            <div className='ml-[20px]'>Loading suggested problems...</div>
        </div>;
    }

    return (
        <div className="flex flex-row flex-wrap w-[98%] justify-around">
            {questionData.map(
                (question, index) => {
                    const difficulty = question?.Question?.difficulty;
                    let backgroundColor = '';

                    if (difficulty === 'easy') {
                        backgroundColor = 'bg-[#0FAF89]';
                    } else if (difficulty === 'medium') {
                        backgroundColor = 'bg-[#FFB341]';
                    } else if (difficulty === 'hard' || difficulty === 'extreme') {
                        backgroundColor = 'bg-[#FF414C]';
                    }

                    return (
                        <div key = {index} onClick={() => viewQuestionModal({
                            questionId: question.Question.id,
                            engagementId: question.Engagement.id})} className={`px-[20px] py-[10px] rounded-[15px] w-[300px] h-[150px] bg-gradient-to-br from-[#FFFFFF] to-[#EAF4FF]
                            flex flex-col justify-between items-center cursor-pointer mb-[10px] text-[12px] text-black text-center shadow-custom ${
                            question.Engagement.status === 'correct' ? 'border-[2px] border-appleGreen' : ' border-[2px] border-appleRed'
                        } flex flex-col justify-between cursor-pointer mb-[10px] text-[12px]`}>
                            <div className="h-[75%] flex flex-col justify-around items-center">
                                <div className="w-[full] h-[20px]">{parseLatexString(truncatePrompt(question.Question.prompt, 8))}</div>
                                <div className={`text-center text-[12px] rounded font-bold ${backgroundColor} text-white px-[10px] py-[2px]`}><strong>{formatDifficulty(question.Question.difficulty)}</strong></div>
                            </div>
                            <div className="text-center w-full h-[25%]">{formatAnswerType(question.Question.topic)}</div>
                        </div>
                    )
                }
            )}
            <div className="w-full flex flex-row justify-center mt-[10px]">
                <div className="border-[2px] px-[20px] py-[5px] rounded-[25px] cursor-pointer text-[12px]" onClick={loadMore}>
                    Load More
                </div>
            </div>
        </div>
    );
}