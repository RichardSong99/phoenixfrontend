import React, { useEffect, useState, useContext } from 'react';

import { Card, CardHeader, CardBody, CircularProgress, CardFooter, Divider, Link, Image, Progress, Button, Checkbox, Chip } from "@nextui-org/react";

import { Icon } from '@iconify/react';
import { useData } from "@/app/helper/context/datacontext";

export default function NewDashboard() {

    var nextStepsList = [
        { title: "Diagnostic test", link: "#", isCompleted: false },
        { title: "Practice test 1", link: "#", isCompleted: false },
        { title: "Practice test 2", link: "#", isCompleted: false },
        { title: "Smart Practice", link: "#", isCompleted: false },
        { title: "Review", link: "#", isCompleted: false },
    ];

    var recommendedTopics = [
        "Linear equations in 1 variable",
        "Linear equations in 2 variables",
        "Quadratic equations",
        "Inequalities",
   
    ];

    const { topicMapping, topicSummaryList, getTopicsByCategory, getTopicSummaryElement } = useData();


    return (
        <div>
            <Card>

                <CardBody>
                    <div className="flex flex-row justify-start items-start w-full gap-2">
                        {/* Each inner div given flex-1 to ensure equal width */}
                        <div className="flex-1 flex flex-col justify-start items-start h-full text-left">
                            <div className="bg-appleGray6 rounded-lg text-[15px] font-bold text-center text-appleGray1 p-1 mb-2  w-full">
                                Your Next Steps
                            </div>


                            <div className="flex flex-col w-full items-center gap-3 px-3 mt-2">
                                {nextStepsList.map((item, index) =>
                                    !item.isCompleted ? (
                                        <div
                                            key={index}
                                            className="flex justify-center items-center w-full cursor-pointer transform transition-transform duration-200 hover:scale-105 text-gray-500 hover:text-black"
                                        >
                                            <span className="text-sm flex items-center gap-2 justify-center">
                                                {item.title}
                                                <Icon
                                                    icon="line-md:arrow-right"
                                                    width="16"
                                                    height="16"
                                                    className="text-gray-400 hover:text-black"
                                                />
                                            </span>
                                        </div>
                                    ) : null
                                )}
                            </div>





                        </div>

                        <div className="flex-1 flex flex-col gap-1 w-[48%]">
                            <div className="bg-appleGray6 rounded-lg text-[15px] font-bold text-center text-appleGray1 p-1 mb-[-30px] z-[1]">
                                Math
                            </div>
                            <div className="flex flex-row justify-center gap-3">
                                <Card className="w-[240px] h-[240px] border-none" shadow="none">
                                    <CardBody className="justify-center items-center">
                                        <CircularProgress
                                            classNames={{
                                                svg: "w-[100px] h-[100px] drop-shadow-md",
                                                track: "blue/5",
                                                value: "text-xl font-semibold blue",
                                            }}
                                            color="#0B2149"
                                            value={(getTopicSummaryElement("Math")?.usage ?? 0) * 100}
                                            strokeWidth={3.5}
                                            showValueLabel={true}
                                        />
                                        {/* <div className="text-[12px] rounded-[25px] border-[2px] px-[5px] mt-[18px]">Question Bank Usage</div> */}
                                    </CardBody>
                                </Card>

                                <div className="flex flex-col w-full gap-2">
                                    <span>Hello world</span>
                                    {recommendedTopics.map((item, index) => (
                                        <Chip size="sm">
                                            {item}
                                        </Chip>
                                    ))}
                                </div>

                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-1 w-[48%]">
                            <div className="bg-appleGray6 rounded-lg text-[15px] font-bold text-center text-appleGray1 p-1 mb-[-30px] z-[1]">
                                Reading & Writing
                            </div>

                            <div className="flex flex-row justify-center gap-3">
                                <Card className="w-[240px] h-[240px] border-none" shadow="none">
                                    <CardBody className="justify-center items-center">
                                        <CircularProgress
                                            classNames={{
                                                svg: "w-[100px] h-[100px] drop-shadow-md",
                                                indicator: "blue",
                                                track: "blue/5",
                                                value: "text-xl font-semibold blue",
                                            }}
                                            value={(getTopicSummaryElement("Reading & writing")?.num_answered ?? 0) / (getTopicSummaryElement("Reading & writing")?.num_total ?? 1) * 100}
                                            strokeWidth={3.5}
                                            showValueLabel={true}
                                        />
                                    </CardBody>
                                </Card>

                                <div className="flex flex-col w-full gap-2 ">
                                    {recommendedTopics.map((item, index) => (
                                        <Chip size="sm">
                                            {item}
                                        </Chip>
                                    ))}
                                </div>

                            </div>
                        </div>

                    </div>

                </CardBody>

            </Card>
        </div>
    );
}