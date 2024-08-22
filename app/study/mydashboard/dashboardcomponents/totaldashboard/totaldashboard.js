import React, { useState, useEffect, useContext } from "react";
import { CircularProgress, Card, CardBody, CardFooter, Chip, Divider, CardHeader, Button, Spinner } from "@nextui-org/react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label, LabelList } from 'recharts';
import { useData } from "@/app/helper/context/datacontext";

export function TotalDashboard() {

    const { topicMapping, topicSummaryList, getTopicsByCategory, filterTopicSummaryList, getTopicSummaryElement } = useData();

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
        topicSummaryList && <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
                <div className="flex flex-col gap-1">
                    <div className="bg-appleGray6 rounded-lg flex items-center justify-center text-xl font-bold text-center text-appleGray1 p-1">
                        Math
                    </div>

                    <div className="flex flex-row gap-3">

                        <Card className="w-[240px] h-[240px] border-none" shadow="none">
                            <CardBody className="justify-center items-center pt-0 pb-0 ">
                                <CircularProgress
                                    classNames={{
                                        svg: "w-36 h-36 drop-shadow-md",
                                        indicator: "blue",
                                        track: "blue/5",
                                        value: "text-3xl font-semibold blue",
                                    }}
                                    value={(getTopicSummaryElement("Math")?.num_answered ?? 0) / (getTopicSummaryElement("Math")?.num_total ?? 1) * 100}
                                    strokeWidth={4}
                                    showValueLabel={true}
                                />
                            </CardBody>
                            <CardFooter className="justify-center items-center pt-0">
                                <Chip
                                    classNames={{
                                        base: "border-1 border-blue/30",
                                        content: "text-small font-semibold",
                                    }}
                                    variant="bordered"
                                >
                                    Question Bank Usage
                                </Chip>
                            </CardFooter>

                        </Card>

                        <Card className="w-[240px] h-[240px] border-none" shadow="none">
                            <CardBody className="justify-center items-center pb-0">
                                <CircularProgress
                                    classNames={{
                                        svg: "w-36 h-36 drop-shadow-md",
                                        indicator: "blue",
                                        track: "blue/5",
                                        value: "text-3xl font-semibold blue",
                                    }}
                                    value={(getTopicSummaryElement("Math")?.num_correct ?? 0) / (getTopicSummaryElement("Math")?.num_answered ?? 1) * 100}
                                    strokeWidth={4}
                                    showValueLabel={true}
                                />
                            </CardBody>
                            <CardFooter className="justify-center items-center pt-0">
                                <Chip
                                    classNames={{
                                        base: "border-1 border-blue/30",
                                        content: "text-small font-semibold",
                                    }}
                                    variant="bordered"
                                >
                                    Accuracy %
                                </Chip>
                            </CardFooter>
                        </Card>
                    </div>
                </div>


                <div className="border-[2px] border-gray-100" />

                <div className="flex flex-col gap-1">
                    <div className="bg-appleGray6 rounded-lg flex items-center justify-center text-xl font-bold text-center text-appleGray1  p-1">
                        Reading & writing
                    </div>

                    <div className="flex flex-row gap-3">

                        <Card className="w-[240px] h-[240px] border-none" shadow="none">
                            <CardBody className="justify-center items-center pt-0 pb-0 ">
                                <CircularProgress
                                    classNames={{
                                        svg: "w-36 h-36 drop-shadow-md",
                                        indicator: "blue",
                                        track: "blue/5",
                                        value: "text-3xl font-semibold blue",
                                    }}
                                    value={(getTopicSummaryElement("Reading & writing")?.num_answered ?? 0) / (getTopicSummaryElement("Reading & writing")?.num_total ?? 1) * 100}
                                    strokeWidth={4}
                                    showValueLabel={true}
                                />
                            </CardBody>
                            <CardFooter className="justify-center items-center pt-0">
                                <Chip
                                    classNames={{
                                        base: "border-1 border-blue/30",
                                        content: "text-small font-semibold",
                                    }}
                                    variant="bordered"
                                >
                                    Question Bank Usage
                                </Chip>
                            </CardFooter>

                        </Card>

                        <Card className="w-[240px] h-[240px] border-none" shadow="none">
                            <CardBody className="justify-center items-center pb-0">
                                <CircularProgress
                                    classNames={{
                                        svg: "w-36 h-36 drop-shadow-md",
                                        indicator: "blue",
                                        track: "blue/5",
                                        value: "text-3xl font-semibold blue",
                                    }}
                                    value={(getTopicSummaryElement("Reading & writing")?.num_correct ?? 0) / (getTopicSummaryElement("Reading & writing")?.num_answered ?? 1) * 100}
                                    strokeWidth={4}
                                    showValueLabel={true}
                                />
                            </CardBody>
                            <CardFooter className="justify-center items-center pt-0">
                                <Chip
                                    classNames={{
                                        base: "border-1 border-blue/30",
                                        content: "text-small font-semibold",
                                    }}
                                    variant="bordered"
                                >
                                    Accuracy %
                                </Chip>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                <div className="border-[2px] border-gray-100" />
                <div className="flex flex-col gap-1 w-full">
                    <div className="bg-appleGray6 rounded-lg flex items-center justify-center text-xl font-bold text-center text-appleGray1  p-1">
                        Recommended Practice
                    </div>
                    <Card className="h-[240px] w-full border-none" shadow="none">

                        <CardBody className="flex flex-wrap pb-0 gap-2">
                            {["Linear equations in 1 variable", "Linear equations in 2 variables", "Linear functions", "Systems of 2 linear equations in 2 variables", "Linear inequalities in 1 or 2 variables"].map((topic, index) => (
                                <Button radius="full" variant="bordered" color="secondary" key={topic}>{topic}</Button>
                            ))}
                        </CardBody>

                    </Card>
                </div>

            </div>

            {/* <div className="border-[2px] border-gray-100" />

            <div>
                <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="num_answered" name="# questions answered" unit=" questions">
                            <Label value="Number of questions answered" offset={-10} position="insideBottom" />
                        </XAxis>
                        <YAxis type="number" dataKey="accuracy" name="Accuracy" unit="%">
                            <Label value="Accuracy %" angle={-90} position="insideLeft" />
                        </YAxis>
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Algebra" data={filterTopicSummaryList("Algebra")} fill="#006FEE">
                            <LabelList dataKey="topic" position="top" />
                        </Scatter>
                        <Scatter name="Advanced math" data={filterTopicSummaryList("Advanced math")} fill="#7828C8">
                            <LabelList dataKey="topic" position="top" />
                        </Scatter>
                        <Scatter name="Problem solving and data analysis" data={filterTopicSummaryList("Problem solving and data analysis")} fill="#17C964">
                            <LabelList dataKey="topic" position="top" />
                        </Scatter>
                        <Scatter name="Geometry and trigonometry" data={filterTopicSummaryList("Geometry and trigonometry")} fill="#F31260">
                            <LabelList dataKey="topic" position="top" />
                        </Scatter>
                        <Legend verticalAlign="top" height={36} />
                    </ScatterChart>
                </ResponsiveContainer>
            </div> */}

        </div>
    );
}