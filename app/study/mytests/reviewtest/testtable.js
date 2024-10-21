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
    Progress
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { fetchQuiz } from '@/app/helper/apiservices/quizservice';
import Loading from '@/app/helper/components/loading/loading';  
import { useData } from '@/app/helper/context/datacontext';
export function TestTable() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { createTestQuiz, setupActiveQuizMode, resumeTestQuiz, setupReviewQuizMode } = useContext(QuestionContext);
    const [testData, setTestData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {globalLoading, setGlobalLoading} = useData();

    const moduleNames = [
        "diagmath1", "diagrw1", "pt1rw1", "pt1rw2",
        "pt1math1", "pt1math2", "pt2rw1", "pt2rw2",
        "pt2math1", "pt2math2"
    ];

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

                    if(response.status === "paused") {
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

        fetchData();
    }, []);

    const startTestModule = async (quizName) => {
        setGlobalLoading(true);
        try {
            const quizID = await createTestQuiz({ quizName });
            router.push(`/study/activequiz?quizid=${quizID}&review=false`);
        } catch (e) {
            console.log(e);
        }
        setGlobalLoading(false);
    };

    const resumeTestModule = async (quizName) => {
        setGlobalLoading(true);
        try {
            const quizID = testData.find(item => item.quizName === quizName).id;
            await resumeTestQuiz({ quizID });
            router.push(`/study/activequiz?quizid=${quizID}&review=false`);
        } catch (e) {
            console.log(e);
        }
        setGlobalLoading(false);
    }

    const reviewTestModule = async (quizName) => {
        setGlobalLoading(true);
        try {
            const quizID = testData.find(item => item.quizName === quizName).id;
            
            await setupReviewQuizMode(quizID);
            router.push(`/study/activequiz?quizid=${quizID}&review=true`);
        } catch (e) {
            console.log(e);
        };
        setGlobalLoading(false);
    };

    const getModuleButton = (quizName) => {
        const module = testData.find(item => item.quizName === quizName);
        if (!module) return null;

        if (module.status === "completed") {
            return <Button className="bg-blue-100" size="sm" onPress={() => reviewTestModule(quizName)}>Review</Button>;
        } else if (module.status === "paused") {
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
        
        else if (module.startCounter === 0) {
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

    if(isLoading){
        return <div className='w-full h-[200px] flex flex-row justify-center items-center'>
            <Spinner />
            <div className='ml-[20px]'>Loading...</div>
        </div>;
    }



    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <Card className="shadow-xl rounded-lg border-2 border-gray-400">
                    <CardHeader className="flex flex-row justify-between items-center w-full">
                        <span className="text-lg font-medium text-gray-800">Diagnostic test</span>
                        <Button size="sm" variant="bordered">Score Report</Button>
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
                        <Button size="sm" variant="bordered">Score Report</Button>
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
                        <Button size="sm" variant="bordered" onPress={onOpen}>Score Report</Button>
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
                            <ModalHeader className="flex flex-col gap-1">Practice Test 1</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-2">
                                    <Card shadow = "none">
                                        <CardHeader className="flex flex-row justify-between items-center w-full">
                                            <span>Math</span>
                                            <span>720</span>
                                            </CardHeader>
                                        <CardBody className = "flex flex-col gap-4 text-gray-500">
                                            <Progress label = "Algebra" value={50} max={100} size = "sm" showValueLabel={true}/>
                                            <Progress label = "Advanced math" value={50} max={100} size = "sm" showValueLabel={true}/>
                                            <Progress label = "Problem solving and data analysis" value={50} max={100} size = "sm" showValueLabel={true}/>
                                            <Progress label = "Geometry and trigonometry" value={50} max={100} size = "sm" showValueLabel={true}/>

                                        </CardBody>
                                    </Card>
                                    <Card shadow = "none">
                                    <CardHeader className="flex flex-row justify-between items-center w-full">
                                            <span>Reading & Writing</span>
                                            <span>720</span>
                                            </CardHeader>
                                        <CardBody className = "flex flex-col gap-4 text-gray-500">
                                            <Progress label = "Rhetorical and structural analysis" value={50} max={100} size = "sm" showValueLabel={true}/>
                                            <Progress label = "Interpreting information and ideas" value={50} max={100} size = "sm" showValueLabel={true}/>
                                            <Progress label = "Standard English conventions" value={50} max={100} size = "sm" showValueLabel={true}/>

                                        </CardBody>
                                    </Card>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
}
