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

    if(!questionData) {
        return <div className='w-full h-[200px] flex flex-row justify-center items-center'>
            <Spinner />
            <div className='ml-[20px]'>Loading suggested problems...</div>
        </div>;
    }

    return (
        <div className="flex flex-row flex-wrap w-full gap-2">
            {questionData.map(
                (question, index) => {
                    const difficulty = question?.Question?.difficulty;
                    let gradientClass = '';
                    let textColor = '';

                    if (difficulty === 'easy') {
                        gradientClass = 'bg-gradient-to-br from-[#45CD91] to-[#0FAF89]';
                        textColor = 'text-[#0FAF89]';
                    } else if (difficulty === 'medium') {
                        gradientClass = 'bg-gradient-to-br from-[#50E2D1] to-[#1283FF]';
                        textColor = 'text-[#005D9E]';
                    } else if (difficulty === 'hard' || difficulty === 'extreme') {
                        gradientClass = 'bg-gradient-to-br from-[#F49AB0] to-[#FF414C]';
                        textColor = 'text-[#FF414C]';
                    }

                    return (
                        <div onClick={() => viewQuestionModal({ questionId: question?.Question?.id })}
                        className={`px-[20px] py-[10px] rounded-[15px] w-[300px] h-[150px] ${gradientClass}
                        flex flex-col justify-between items-center cursor-pointer mb-[10px] text-[12px] text-white text-center`}>
                            <div className="h-[75%] flex flex-col justify-around items-center">
                                <div className="w-[full] h-[20px]">{parseLatexString(truncatePrompt(question.Question.prompt, 8))}</div>
                                <Chip className={`text-center border h-[20px] bg-white px-[4px] py-[2px] text-[12px] rounded-[10px] font-bold ${textColor}`}><strong>{formatDifficulty(question.Question.difficulty)}</strong></Chip>
                            </div>
                            <div className="text-center w-full h-[25%]">{formatAnswerType(question.Question.topic)}</div>
                        </div>
                    )
                }
            )}
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

    if(!questionData) {
        return <div className='w-full h-[200px] flex flex-row justify-center items-center'>
            <Spinner />
            <div className='ml-[20px]'>Loading suggested problems...</div>
        </div>;
    }

    return (
        <div className="flex flex-row flex-wrap w-full gap-2">
            {questionData.map(
                (question, index) => {
                    return (
                        <div onClick={() => viewQuestionModal({
                            questionId: question.Question.id,
                            engagementId: question.Engagement.id})} className={`px-[20px] py-[10px] rounded-[15px] w-[200px] h-[150px] bg-themeLightGray ${
                            question.Engagement.status === 'correct' ? 'border-[2px] border-appleGreen' : ' border-[2px] border-appleRed'
                        } flex flex-col justify-between cursor-pointer mb-[10px] text-[12px]`}>
                            <div className="w-[130px]">{parseLatexString(truncatePrompt(question.Question.prompt, 8))}</div>
                            <div>
                                <div className="text-center w-full">{formatDifficulty(question.Question.difficulty)}</div>
                                <div className="text-center w-full">{formatAnswerType(question.Question.answer_type)}</div>
                            </div>
                        </div>
                    )
                }
            )}
        </div>
    );
}