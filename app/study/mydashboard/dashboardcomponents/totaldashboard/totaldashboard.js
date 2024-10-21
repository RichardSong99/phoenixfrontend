import React, { useState, useEffect, useContext } from "react";
import { CircularProgress, Card, CardBody, CardFooter, Chip, Divider, CardHeader, Button, Spinner } from "@nextui-org/react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label, LabelList } from 'recharts';
import { useData } from "@/app/helper/context/datacontext";

export function TotalDashboard() {

    const { topicMapping, topicSummaryList, getTopicsByCategory, getTopicSummaryElement } = useData();

    const data = [
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 },
        { x: 110, y: 280, z: 200 },
    ];

    if(!topicSummaryList) {
        return <div className='w-full h-[200px] flex flex-row justify-center items-center'>
            <Spinner />
            <div className='ml-[20px]'>Loading...</div>
        </div>;
    }

    return (
        topicSummaryList && <div className="flex flex-col">
            <div className="flex flex-row justify-around h-[230px]">
                <div className="flex flex-col gap-1 w-[48%]">
                    <div className="bg-appleGray6 rounded-lg text-[15px] font-bold text-center text-appleGray1 p-1 mb-[-30px] z-[1]">
                        Math
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
                                    value={(getTopicSummaryElement("Math")?.num_answered ?? 0) / (getTopicSummaryElement("Math")?.num_total ?? 1) * 100}
                                    strokeWidth={3.5}
                                    showValueLabel={true}
                                />
                                <div className="text-[12px] rounded-[25px] border-[2px] px-[5px] mt-[18px]">Question Bank Usage</div>
                            </CardBody>
                        </Card>
                        <Card className="w-[240px] h-[240px] border-none" shadow="none">
                            <CardBody className="justify-center items-center">
                                <CircularProgress
                                    classNames={{
                                        svg: "w-[100px] h-[100px] drop-shadow-md",
                                        indicator: "blue",
                                        track: "blue/5",
                                        value: "text-xl font-semibold blue",
                                    }}
                                    value={(getTopicSummaryElement("Math")?.num_correct ?? 0) / (getTopicSummaryElement("Math")?.num_answered ?? 1) * 100}
                                    strokeWidth={3.5}
                                    showValueLabel={true}
                                />
                                <div className="text-[12px] rounded-[25px] border-[2px] px-[5px] mt-[18px]">Accuracy %</div>
                            </CardBody>
                        </Card>
                    </div>
                </div>


                <div className="border-[1.5px] border-gray-100" />

                <div className="flex flex-col gap-1 w-[48%]">
                    <div className="bg-appleGray6 rounded-lg text-[15px] font-bold text-center text-appleGray1 p-1 mb-[-30px] z-[1]">
                        Reading & writing
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
                                <div className="text-[12px] rounded-[25px] border-[2px] px-[5px] mt-[18px]">Question Bank Usage</div>
                            </CardBody>
                        </Card>
                        <Card className="w-[240px] h-[240px] border-none" shadow="none">
                            <CardBody className="justify-center items-center">
                                <CircularProgress
                                    classNames={{
                                        svg: "w-[100px] h-[100px] drop-shadow-md",
                                        indicator: "blue",
                                        track: "blue/5",
                                        value: "text-xl font-semibold blue",
                                    }}
                                    value={(getTopicSummaryElement("Reading & writing")?.num_correct ?? 0) / (getTopicSummaryElement("Reading & writing")?.num_answered ?? 1) * 100}
                                    strokeWidth={3.5}
                                    showValueLabel={true}
                                />
                                <div className="text-[12px] rounded-[25px] border-[2px] px-[5px] mt-[18px]">Accuracy %</div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>


        </div>
    );
}