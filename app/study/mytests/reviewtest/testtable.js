"use client"

import React, { useState, useEffect, useContext } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    Spinner,
    Card,
    CardBody,
    CardHeader,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Progress,
    Divider
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { fetchQuiz } from '@/app/helper/apiservices/quizservice';
import Loading from '@/app/helper/components/loading/loading';
import { useData } from '@/app/helper/context/datacontext';
import { getScoreReport } from '@/app/helper/apiservices/dataservice';

export function TestTable() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { createTestQuiz, setupActiveQuizMode, resumeTestQuiz, setupReviewQuizMode, NEWTESTACTION, REVIEWACTION, RESUMEACTION } = useContext(QuestionContext);
    const [testData, setTestData] = useState([]);

    const [scoreReportTestName, setScoreReportTestName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loadingScoreReport, setLoadingScoreReport] = useState(true);

    const [mathMedianScore, setMathMedianScore] = useState(0);

    const [readingWritingMedianScore, setReadingWritingMedianScore] = useState(0);


    const { globalLoading, setGlobalLoading } = useData();

    const moduleNames = [
        "diagmath1", "diagrw1", "pt1rw1", "pt1rw2",
        "pt1math1", "pt1math2", "pt2rw1", "pt2rw2",
        "pt2math1", "pt2math2"
    ];

    const testQuizNameMap = {
        diag: ["diagmath1", "diagrw1"],
        pt1: ["pt1rw1", "pt1rw2", "pt1math1", "pt1math2"],
        pt2: ["pt2rw1", "pt2rw2", "pt2math1", "pt2math2"]
    };

    const testNameMap = {
        diag: ["Diagnostic Test"],
        pt1: ["Practice Test 1"],
        pt2: ["Practice Test 2"]
    }


    const [scoreReport, setScoreReport] = useState({});

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            let newData = []; // Accumulate data before setting state
            var startCounter = 0;

            for (let i = 0; i < moduleNames.length; i++) {
                try {
                    const response = await fetchQuiz({ quizName: moduleNames[i] });
                    newData.push({
                        quizName: moduleNames[i],
                        id: response.id,
                        status: response.status,
                    });

                    if (response.status === "paused") {
                        startCounter = 1;
                    }
                } catch (e) {
                    newData.push({
                        quizName: moduleNames[i],
                        id: null,
                        status: "unstarted",
                        startCounter: startCounter
                    });
                    startCounter++;
                }
            }

            // Set testData only once after data fetching is done
            setTestData(newData);
            setIsLoading(false);
        };

        // setGlobalLoading(false);
        fetchData();
    }, []);

    const startTestModule = async (quizName) => {
        setGlobalLoading(true);
        try {
            const quizID = await createTestQuiz({ quizName });
            if (quizID) {
                router.push(`/study/activequiz?quizid=${quizID}&action=${NEWTESTACTION}`);
            } else {
                console.error("Quiz ID not received from createTestQuiz.");
            }
        } catch (e) {
            console.error("Error starting test module:", e);
        } finally {
            setGlobalLoading(false); // Ensure loading is reset
        }
    };
    
    const resumeTestModule = async (quizName) => {
        setGlobalLoading(true);
        try {
            const quiz = testData.find(item => item.quizName === quizName);
            if (!quiz || !quiz.id) {
                console.error(`Quiz with name "${quizName}" not found or has no ID.`);
                return;
            }
    
            const quizID = quiz.id;
    
            // Navigate to resume the quiz
            router.push(`/study/activequiz?quizid=${quizID}&action=${RESUMEACTION}`);
        } catch (e) {
            console.error("Error resuming test module:", e);
        } finally {
            setGlobalLoading(false); // Ensure loading is reset
        }
    };
    

    const reviewTestModule = async (quizName) => {
        setGlobalLoading(true);
        try {
            const quiz = testData.find(item => item.quizName === quizName);
    
            if (!quiz || !quiz.id) {
                console.error(`Quiz with name "${quizName}" not found or has no ID.`);
                return;
            }
    
            const quizID = quiz.id;
    
            // Navigate to the review page
            router.push(`/study/activequiz?quizid=${quizID}&action=${REVIEWACTION}`);
        } catch (e) {
            console.error("Error navigating to review module:", e);
        } finally {
            setGlobalLoading(false); // Ensure loading is reset after function completes
        }
    };
    

    const getModuleButton = (quizName) => {
        const thisModule = testData.find(item => item.quizName === quizName);
        if (!thisModule) return null;

        if (thisModule.status === "completed") {
            return <Button className="bg-blue-100" size="sm" onPress={() => reviewTestModule(quizName)}>Review</Button>;
        } else if (thisModule.status === "paused") {
            return (
                <Button
                    className="bg-blue-700 text-white"
                    size="sm"
                    onPress={() => resumeTestModule(quizName)}
                >
                    Resume
                </Button>
            );
        }

        else if (thisModule.startCounter === 0) {
            return (
                <Button
                    className="bg-blue-700 text-white"
                    size="sm"
                    onPress={() => startTestModule(quizName)}
                >
                    Start
                </Button>
            );
        } else {
            return (
                <Button className="bg-gray-400" isIconOnly size="sm">
                    <Icon icon="material-symbols:lock" width="16" height="16" className="text-white" />
                </Button>
            );
        }
    };

    const isTestCompleted = (testName) => {
        try {
            var quiz_name_list = testQuizNameMap[testName] || [];

            var completed = false;

            for (let i = 0; i < quiz_name_list.length; i++) {
                if (testData.find(item => item.quizName === quiz_name_list[i]).status === "completed") {
                    completed = true;
                } else {
                    return false;
                }
            }
        }
        catch (e) {
            return false;
        }

        return completed;
    }


    if (isLoading) {
        return <div className='w-full h-[200px] flex flex-row justify-center items-center'>
            <Spinner />
            <div className='ml-[20px]'>Loading...</div>
        </div>;
    }

    const loadScoreReport = async (testName) => {
        setLoadingScoreReport(true);
        onOpen();

        setScoreReportTestName(testName);

        try {
            var quiz_name_list = testQuizNameMap[testName] || [];

            var quiz_id_list = [];
            for (let i = 0; i < quiz_name_list.length; i++) {
                quiz_id_list.push(testData.find(item => item.quizName === quiz_name_list[i]).id);
            }

            const response = await getScoreReport({ quiz_id_list: quiz_id_list });
            setScoreReport(response);
            console.log("score report", response);

            try {
                setMathMedianScore(response.math_median);
                setReadingWritingMedianScore(response.reading_writing_median);

            } catch (e) {
                console.log(e);
            }

        } catch (e) {
            console.log(e);
        }

        setLoadingScoreReport(false);
    };



    const getScoreReportMetric = (topic, metric) => {
        try {
            return scoreReport.topic_summary_list.find(item => item.topic === topic)[metric];
        } catch (e) {
            return 0;
        }
    }

    const getCategoryScoreComponent = (category) => {
        try {
            return (
                <div className="flex flex-row gap-2 items-end">
                    <Progress
                        label={category}
                        value={getScoreReportMetric(category, "accuracy") * 100}
                        max={100}
                        size="sm"
                        showValueLabel={true}
                        className="text-sm flex-grow"
                    />
                    <div className="w-[50px] flex-shrink-0 flex items-center justify-end">
                        <span className="text-sm text-gray-600">
                            {getScoreReportMetric(category, "num_correct")} / {getScoreReportMetric(category, "num_answered")}
                        </span>
                    </div>
                </div>
            );
        }
        catch (e) {
            return null;
        }
    }



    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <Card className="shadow-xl rounded-lg border-2 border-gray-400">
                    <CardHeader className="flex flex-row justify-between items-center w-full">
                        <span className="text-lg font-medium text-gray-800">Diagnostic test</span>
                        {isTestCompleted("diag") && <Button size="sm" variant="bordered" onPress={() => loadScoreReport("diag")}>Score Report</Button>}
                    </CardHeader>
                    <CardBody className="space-y-2 p-3">
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-gray-600 text-sm">Math diagnostic</span>
                            {getModuleButton("diagmath1")}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-gray-600 text-sm">Reading diagnostic</span>
                            {getModuleButton("diagrw1")}
                        </div>
                    </CardBody>
                </Card>

                <Card className="shadow-xl rounded-lg border-2 border-gray-400">
                    <CardHeader className="flex flex-row justify-between items-center w-full">
                        <span className="text-lg font-medium text-gray-800">Practice test 1</span>
                        {isTestCompleted("pt1") && <Button size="sm" variant="bordered">Score Report</Button>}
                    </CardHeader>
                    <CardBody className="space-y-2 p-3">
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-gray-600 text-sm">Reading & Writing module 1</span>
                            {getModuleButton("pt1rw1")}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-gray-600 text-sm">Reading & Writing module 2</span>
                            {getModuleButton("pt1rw2")}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-gray-600 text-sm">Math module 1</span>
                            {getModuleButton("pt1math1")}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-gray-600 text-sm">Math module 2</span>
                            {getModuleButton("pt1math2")}
                        </div>
                    </CardBody>
                </Card>

                <Card className="shadow-xl rounded-lg border-2 border-gray-400">
                    <CardHeader className="flex flex-row justify-between items-center w-full">
                        <span className="text-lg font-medium text-gray-800">Practice test 2</span>
                        {isTestCompleted("pt2") && <Button size="sm" variant="bordered" onPress={onOpen}>Score Report</Button>}
                    </CardHeader>
                    <CardBody className="space-y-2 p-3">
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-gray-600 text-sm">Reading & Writing module 1</span>
                            {getModuleButton("pt2rw1")}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-gray-600 text-sm">Reading & Writing module 2</span>
                            {getModuleButton("pt2rw2")}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-gray-600 text-sm">Math module 1</span>
                            {getModuleButton("pt2math1")}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-gray-600 text-sm">Math module 2</span>
                            {getModuleButton("pt2math2")}
                        </div>
                    </CardBody>
                </Card>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-2 font-semibold text-gray-800 text-2xl">
                                <span className="flex flex-col gap-2 font-semibold text-gray-800 text-2xl">
                                    {testNameMap[scoreReportTestName] || "Score Report"}
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                {loadingScoreReport ? (
                                    <div className="w-full h-[200px] flex justify-center items-center">
                                        <Spinner />
                                        <div className="ml-4 text-gray-600">Loading...</div>
                                    </div>
                                ) : (
                                    Object.keys(scoreReport).length !== 0 && (
                                        <div className="flex flex-col gap-4">
                                            {/* Math Card */}
                                            <Card shadow="none" className="border border-gray-200 rounded-lg">
                                                <CardHeader className="flex justify-between items-center w-full text-gray-700">
                                                    <span className="font-semibold">Math</span>
                                                    <span className="text-xl font-medium text-themeGreen">{mathMedianScore}</span>
                                                </CardHeader>
                                                <CardBody className="flex flex-col gap-4 text-gray-600">
                                                    {getCategoryScoreComponent("Algebra")}
                                                    {getCategoryScoreComponent("Advanced math")}
                                                    {getCategoryScoreComponent("Problem solving and data analysis")}
                                                    {getCategoryScoreComponent("Geometry and trigonometry")}
                                                </CardBody>
                                            </Card>

                                            {/* Reading & Writing Card */}
                                            <Card shadow="none" className="border border-gray-200 rounded-lg">
                                                <CardHeader className="flex justify-between items-center w-full text-gray-700">
                                                    <span className="font-semibold">Reading & Writing</span>
                                                    <span className="text-xl font-medium text-themeGreen">{readingWritingMedianScore}</span>
                                                </CardHeader>
                                                <CardBody className="flex flex-col gap-4 text-gray-600">
                                                    {getCategoryScoreComponent("Rhetorical and structural analysis")}
                                                    {getCategoryScoreComponent("Interpreting information and ideas")}
                                                    {getCategoryScoreComponent("Standard English conventions")}
                                                </CardBody>
                                            </Card>
                                        </div>
                                    )
                                )}
                            </ModalBody>

                            <ModalFooter className="flex justify-end gap-2">
                                <Button color="danger" variant="light" onPress={onClose} className="rounded-md text-sm">
                                    Close
                                </Button>
                                {/* <Button color="primary" onPress={onClose} className="rounded-md text-sm">
                                    Action
                                </Button> */}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </>
    );
}
