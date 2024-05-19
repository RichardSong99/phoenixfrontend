"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Progress } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/react';
import { QuizTable } from './dashboardcomponents/reviewquiz/quiztable';
import { PracticeTestPanel } from './dashboardcomponents/practicetest/practicetesttable';
import { CreateQuizModal } from './dashboardcomponents/createquiz/createquiz';
import { useDisclosure } from '@nextui-org/react';
import { DashboardContents } from '@/app/study/mydashboard/dashboardcomponents/statspanel/statspanel';
import { getQuestions } from '@/app/helper/apiservices/questionservice';
import { QuestionCard } from '../../helper/components/question/questioncard/questioncard';
import { loadPracticeModules, loadLessonModules, goToModule } from '../../helper/data/modulegetter';
import { ModuleCard } from './dashboardcomponents/modules/modulecard';
import { useRouter } from 'next/navigation';
import { QuestionModal } from '../../helper/components/question/questionviewcomponents/questionmodal'; 

export default function Page() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenQuestion, onOpen: onOpenQuestion, onOpenChange: onOpenChangeQuestion } = useDisclosure();


    const router = useRouter();

    const [unattemptedQuestions, setUnattemptedQuestions] = useState([]);
    const [recentlyAnsweredQuestions, setRecentlyAnsweredQuestions] = useState([]);
    const [selectedQuestionTab, setSelectedQuestionTab] = useState("unattempted");

    const [practiceModules, setPracticeModules] = useState([]);
    const [lessonModules, setLessonModules] = useState([]);
    const [activeModules, setActiveModules] = useState([]);

    const [activeModuleType, setActiveModuleType] = useState("all");

    const [activeQuestion, setActiveQuestion] = useState(null);


    const loadQuestions = async () => {
        try {
            const unattemptedData = await getQuestions({ unattempted: true });
            const recentlyAnsweredData = await getQuestions({ unattempted: false, sortAttemptTime: 'desc' });
            setUnattemptedQuestions(unattemptedData.data);
            setRecentlyAnsweredQuestions(recentlyAnsweredData.data);
            console.log("unattemptedData", unattemptedData);
            console.log("recentlyAnsweredData", recentlyAnsweredData);
        } catch (error) {
            console.log("Error loading questions", error);
        }
    }

    const onQuestionClick = (question) => {
        setActiveQuestion(question);
        onOpenQuestion();

    }


    useEffect(() => {
        const fetchData = async () => {
            await loadQuestions();
            setPracticeModules(await loadPracticeModules());
            setLessonModules(await loadLessonModules());
        };
        fetchData();
    }, []);

    const loadActiveModules = () => {
        if (activeModuleType === "all") {
            setActiveModules([...practiceModules, ...lessonModules]);
        } else if (activeModuleType === "practiceQuestions") {
            setActiveModules(practiceModules);
        } else if (activeModuleType === "videos") {
            setActiveModules(lessonModules);
        }
    }

    useEffect(() => {
        loadActiveModules();
    }, [activeModuleType, practiceModules, lessonModules]);


    return (
        <div className="flex flex-row w-full justify-center my-4">


            <CreateQuizModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />

            <QuestionModal  
                isOpen={isOpenQuestion}
                onOpen={onOpenQuestion}
                onOpenChange={onOpenChangeQuestion}
                question={activeQuestion}
                mode={'browse'}
            />

            <div className="flex flex-col w-2/3 gap-4">


                <div className="flex flex-row w-full justify-center landing-section">
                    {/*My overview*/}
                    <Card className="bg-blue-500 rounded-lg shadow-md p-4" style={{ width: '100%' }}>
                        <CardHeader>
                            <h1 className="text-2xl font-bold text-white">Welcome, Richard</h1>
                        </CardHeader>
                    </Card>
                </div>

                <div className=" flex-row w-full">
                    {/*Buttons*/}

                </div>


                <div>
                    {/*My quizzes*/}
                    <Card>
                        <CardHeader>
                            <div className="flex flex-row w-full justify-between items-center">
                                <div><h5 className="font-bold text-large">My Quizzes</h5></div>
                                <Button
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full"
                                    onPress={onOpen}
                                >
                                    Create Quiz
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <QuizTable />
                        </CardBody>
                    </Card>
                </div>

                <div>
                    {/*My practice tests*/}
                    <Card>
                        <CardHeader>
                            <h5 className="font-bold text-large">Practice Tests</h5>
                        </CardHeader>
                        <CardBody>
                            <PracticeTestPanel />
                        </CardBody>
                    </Card>
                </div>
                <div>
                    {/*My practice tests*/}
                    <Card>
                        <CardHeader>
                            <div className="flex flex-row w-full justify-between items-center">
                                <h5 className="font-bold text-large">Lesson Modules</h5>

                                <Tabs size="sm" selectedKey={activeModuleType} onSelectionChange={setActiveModuleType}>
                                    <Tab key="all" title="All" />
                                    <Tab key="practiceQuestions" title="Practice Questions" />
                                    <Tab key="videos" title="Videos" />
                                </Tabs>
                            </div>
                        </CardHeader>
                        <CardBody className="flex-row gap-2" style={{ flexWrap: 'wrap' }}>
                            {activeModules.map((module) => (
                                <ModuleCard module={module} />
                            ))}
                        </CardBody>
                    </Card>
                </div>

                <div>
                    {/*Browse questions*/}
                    <Card>
                        <CardHeader>
                            <div className="flex flex-row w-full justify-between items-center">
                                <h5 className="font-bold text-large">Browse Questions</h5>


                                <Tabs size="sm" selectedKey={selectedQuestionTab} onSelectionChange={setSelectedQuestionTab}>
                                    <Tab key="unattempted" title="Unattempted" />
                                    <Tab key="recentlyAnswered" title="Recently answered" />
                                </Tabs>

                                <Button onClick = {() => router.push("/study/browse")} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-0.5 px-4 rounded-full">
                                    Browse all Questions
                                </Button>

                            </div>
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                                {selectedQuestionTab === "unattempted" && unattemptedQuestions.slice(0, 9).map((question) => (
                                    <QuestionCard question={question} clickQuestionHandler = {onQuestionClick}/>
                                ))}
                                {selectedQuestionTab === "recentlyAnswered" && recentlyAnsweredQuestions.slice(0, 9).map((question) => (
                                    <QuestionCard question={question} clickQuestionHandler = {onQuestionClick}/>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div>
                    {/*My stats*/}
                    <Card>
                        <CardHeader>
                            <div className="flex flex-row w-full justify-between items-center">
                                <h5 className="font-bold text-large">My Stats</h5>

                                <Tabs size="sm">
                                    <Tab key="remaining" title="Questions remaining" />
                                    <Tab key="usage" title="% Question bank used" />
                                    <Tab key="accuracy" title="% Accuracy" />
                                </Tabs>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <DashboardContents />
                        </CardBody>
                    </Card>
                </div>


            </div>
        </div>
    );
}