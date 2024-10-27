import React, { useEffect, useState, useContext, use } from 'react';

import { Card, CardHeader, CardBody, CircularProgress, CardFooter, Divider, Link, Image, Progress, Button, Checkbox, Chip, Tooltip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

import { QuestionContext } from '@/app/helper/context/questioncontext';

import { Icon } from '@iconify/react';
import { useData } from "@/app/helper/context/datacontext";

export default function NewDashboard() {


    const [mathRecommendedTopics, setMathRecommendedTopics] = useState([]);
    const [rwRecommendedTopics, setRWRecommendedTopics] = useState([]);
    const [displayErrorInModal, setDisplayErrorInModal] = useState(false);


    const { topicMapping, topicSummaryList, getTopicsByCategory, getTopicSummaryElement, getWorstTopics } = useData();

    const { createAdaptiveQuiz, setSelectedTopics, NEWADAPTIVEQUIZACTION } = useContext(QuestionContext);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    useEffect(() => {
        const mathTopics = getWorstTopics("Math", 5);
        setMathRecommendedTopics(mathTopics);

        const rwTopics = getWorstTopics("Reading & Writing", 5);
        setRWRecommendedTopics(rwTopics);
    }, [topicMapping, topicSummaryList]);


    const [selectedTopicsLocal, setSelectedTopicsLocal] = useState("");

    const handleRecommendedTopicClick = (topic) => {
        console.log("Selected topic: ", topic)
        setSelectedTopicsLocal([topic]);
        onOpen();
        console.log("Selected topic: ", topic, "tried to open modal");
    }

    const handlePracticeClick = async (onClose) => {
        onClose();
        setSelectedTopics(selectedTopicsLocal);
        try {
            const response = await createAdaptiveQuiz({
                topics: selectedTopicsLocal,
            });

            if (response !== null) {
                router.push(`/study/activequiz?quizid=${response}&action=${NEWADAPTIVEQUIZACTION}`);
            } else {
                console.log("Failed to create adaptive quiz");
                setDisplayErrorInModal(true);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="flex w-full flex-col items-center gap-4"> 
            <Card className="flex w-full flex-col items-center gap-4">

                <CardBody>
                    <div className="flex flex-row justify-start items-start w-full gap-4">
                        {/* Each inner div given flex-1 to ensure equal width */}
                        {/* <div className="flex flex-col justify-start items-start h-full text-left w-64">
                            <div className="bg-appleGray6 rounded-lg text-[15px] font-bold text-center text-appleGray1 p-1 mb-2  w-full">
                                Your Resources
                            </div>


                            <div className="flex flex-col w-full items-start gap-3 px-3 mt-2">

                                <Button className="text-sm flex items-center gap-2 justify-center bg-gray-800 text-white">
                                    Math textbook
                                    <Icon
                                        icon="line-md:arrow-right"
                                        width="16"
                                        height="16"
                                        className="text-white"
                                    />
                                </Button>
                                <Button className="text-sm flex items-center gap-2 justify-center bg-gray-800 text-white">
                                    Math cheat sheet
                                    <Icon
                                        icon="line-md:arrow-right"
                                        width="16"
                                        height="16"
                                        className="text-white"
                                    />
                                </Button>
                                <Button className="text-sm flex items-center gap-2 justify-center bg-gray-800 text-white">
                                    Reading & Writing textbook
                                    <Icon
                                        icon="line-md:arrow-right"
                                        width="16"
                                        height="16"
                                        className="text-white"
                                    />
                                </Button>
                                <Button className="text-sm flex items-center gap-2 justify-center bg-gray-800 text-white">
                                    Vocab list
                                    <Icon
                                        icon="line-md:arrow-right"
                                        width="16"
                                        height="16"
                                        className="text-white"
                                    />
                                </Button>
                            </div>
                        </div> */}

                        <div className="flex-1 flex flex-col gap-1 w-[48%]">
                            <div className="bg-appleGray6 rounded-lg text-[17px] font-bold text-center text-gray-700 p-1  z-[1]">
                                Math
                            </div>
                            <div className="flex flex-col justify-center pt-2 px-2 gap-2">
                                <div className="flex flex-row justify-between items-center text-gray-600 text-[13px]">
                                    <div className="text-gray-600 text-[13px]">
                                        <span className="font-bold text-[16px]">{Math.round(getTopicSummaryElement("Math")?.usage * 100) || 0}%</span> completed
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <div>
                                            <span className="font-bold text-[16px]">{getTopicSummaryElement("Math")?.num_total || 0 - getTopicSummaryElement("Math")?.num_answered || 0} </span>questions left
                                        </div>
                                        <div>
                                            <span className="font-bold text-[16px]">{getTopicSummaryElement("Math")?.num_answered || 0} </span>answered
                                        </div>

                                    </div>

                                </div>
                                <Progress
                                    size="md"
                                    value={(getTopicSummaryElement("Math")?.usage ?? 0) * 100}
                                    strokeWidth={4}
                                    className="w-full"

                                />

                                <Divider />

                                {/* Recommended Practice */}
                                <div className="flex flex-row gap-2">
                                    <div className="flex flex-col w-full gap-2">
                                        <div className="flex flex-row items-center mb-1 gap-1"><span className="text-center text-gray-500 text-[13px]">Recommended Practice</span>
                                            <Tooltip content="These are topics in which your accuracy is lowest">
                                                <Icon icon="mdi:information-outline" width="15" height="15" style={{ color: "#AAAAAA" }} />
                                            </Tooltip>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {mathRecommendedTopics.map((item, index) => (
                                                <Chip
                                                    key={index}
                                                    size="sm"
                                                    radius="sm"
                                                    className="bg-blue-100 text-gray-800 cursor-pointer hover:bg-blue-200 hover:text-blue-900 transition-colors duration-200"
                                                    onClick={() => handleRecommendedTopicClick(item.topic)}

                                                    endContent={<Icon icon="line-md:arrow-right" width="16" height="16" className="text-blue-800"
                                                    />}
                                                >
                                                    {item.topic}
                                                </Chip>
                                            ))}

                                        </div>
                                    </div>
                                    <Divider orientation="vertical" />
                                    <div className="flex flex-col w-full gap-2">
                                        <div className="flex flex-row items-center mb-1"><span className="text-center text-gray-500 text-[13px]">Resources</span></div>
                                        <div className="flex flex-col gap-2">
                                            <Chip
                                                size="sm"
                                                radius="sm"
                                                className="bg-gray-100 text-gray-800 cursor-pointer "
                                                endContent={<Icon icon="line-md:arrow-right" width="16" height="16" />}
                                            >
                                                Math textbook
                                            </Chip>
                                            <Chip
                                                size="sm"
                                                radius="sm"
                                                className="bg-gray-100 text-gray-800 cursor-pointer "
                                                endContent={<Icon icon="line-md:arrow-right" width="16" height="16" />}
                                            >
                                                Math cheat sheet
                                            </Chip>


                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-1 w-[48%]">
                            <div className="bg-appleGray6 rounded-lg text-[17px] font-bold text-center text-gray-700 p-1  z-[1]">
                                Reading & Writing
                            </div>
                            <div className="flex flex-col justify-center pt-2 px-2 gap-2">
                                <div className="flex flex-row justify-between items-center text-gray-600 text-[13px]">
                                    <div className="text-gray-600 text-[13px]">
                                        <span className="font-bold text-[16px]">{Math.round(getTopicSummaryElement("Reading & Writing")?.usage * 100) || 0}%</span> completed
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <div>
                                            <span className="font-bold text-[16px]">{getTopicSummaryElement("Reading & Writing")?.num_total || 0 - getTopicSummaryElement("Reading & Writing")?.num_answered || 0} </span>questions left
                                        </div>
                                        <div>
                                            <span className="font-bold text-[16px]">{getTopicSummaryElement("Reading & Writing")?.num_answered || 0} </span>answered
                                        </div>

                                    </div>

                                </div>
                                <Progress
                                    size="md"
                                    value={(getTopicSummaryElement("Reading & Writing")?.usage ?? 0) * 100}
                                    strokeWidth={4}
                                    className="w-full"

                                />

                                <Divider />

                                {/* Recommended Practice */}
                                <div className="flex flex-row gap-2">
                                    <div className="flex flex-col w-full gap-2">
                                        <div className="flex flex-row items-center mb-1 gap-1"><span className="text-center text-gray-500 text-[13px]">Recommended Practice</span>
                                            <Tooltip content="These are topics in which your accuracy is lowest">
                                                <Icon icon="mdi:information-outline" width="15" height="15" style={{ color: "#AAAAAA" }} />
                                            </Tooltip>
                                        </div>                                        <div className="flex flex-col gap-2">
                                            {rwRecommendedTopics.map((item, index) => (
                                                <Chip
                                                    key={index}
                                                    size="sm"
                                                    radius="sm"
                                                    className="bg-blue-100 text-gray-800 cursor-pointer hover:bg-blue-200 hover:text-blue-900 transition-colors duration-200"
                                                    onClick={() => handleRecommendedTopicClick(item.topic)}

                                                    endContent={<Icon icon="line-md:arrow-right" width="16" height="16" className="text-blue-800"

                                                    />}
                                                >
                                                    {item.topic}
                                                </Chip>
                                            ))}

                                        </div>
                                    </div>
                                    <Divider orientation="vertical" />
                                    <div className="flex flex-col w-full gap-2">
                                        <div className="flex flex-row items-center mb-1"><span className="text-center text-gray-500 text-[13px]">Resources</span></div>
                                        <div className="flex flex-col gap-2">
                                            <Chip
                                                size="sm"
                                                radius="sm"
                                                className="bg-gray-100 text-gray-800 cursor-pointer "
                                                endContent={<Icon icon="line-md:arrow-right" width="16" height="16" />}
                                            >
                                                Reading & Writing textbook
                                            </Chip>
                                            <Chip
                                                size="sm"
                                                radius="sm"
                                                className="bg-gray-100 text-gray-800 cursor-pointer "
                                                endContent={<Icon icon="line-md:arrow-right" width="16" height="16" />}
                                            >
                                                Vocab list
                                            </Chip>


                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>

                </CardBody>

            </Card>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{selectedTopicsLocal[0]}</ModalHeader>
                            <ModalBody>
                                {/* <CheckboxGroup
                  className="gap-1"
                  label="Select difficulties"
                  orientation="horizontal"
                  value={selectedDifficultiesLocal}
                  onChange={setSelectedDifficultiesLocal}
                >
                  <CustomCheckbox value="easy">easy</CustomCheckbox>
                  <CustomCheckbox value="medium">medium</CustomCheckbox>
                  <CustomCheckbox value="hard">hard</CustomCheckbox>
                </CheckboxGroup> */}

                                {displayErrorInModal && <div className="text-red-500 text-sm">Error creating adaptive quiz.</div>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => handlePracticeClick(onClose)}>
                                    Start Practice
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}