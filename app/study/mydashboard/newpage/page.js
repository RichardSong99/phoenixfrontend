"use client"

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@nextui-org/react";

import { useRouter } from 'next/navigation';

import TopicModules from "../dashboardcomponents/topicmodules/topicmodules";
import { TotalDashboard } from "../dashboardcomponents/totaldashboard/totaldashboard";
import { RecommendedProblems, RecentProblems } from "../problemsuggestions/recommendedproblems";
import QBankViewer from "@/app/helper/components/qbank/qbankview/qbankviewer";
import { QuizTable } from "../../myquizzes/reviewquiz/quiztable";

export default function MyDashboard() {

  const router = useRouter();
  const [selected, setSelected] = useState("topics");

  return (
    <div className="flex flex-col w-full justify-center p-10 gap-4 pl-[300px] pr-[300px] pt-[70px] bg-themeWhite">
        <div className="w-screen h-[55px] border-bottom bg-white absolute top-0 left-0 z-[999] pl-[150px] pt-[10px]">
            <h3>Phoenix <span className="text-themeLightGreen">SAT</span></h3>
        </div>
        <div className="flex flex-row w-full justify-center">
            <div className="w-full h-[75px] text-white bg-[#0B2149] text-white rounded-[10px] shadow-custom flex flex-row items-center pt-[10px] pl-[20px]">
                <h4><strong>Welcome, Richard</strong></h4>
            </div>
        </div>

        <Card>
            <CardBody>
                <TotalDashboard />
            </CardBody>
        </Card>
        {/* <Card>
            <CardHeader>
                <div className="flex flex-row w-full justify-between items-center">
                    <h5 className="text-[18px] mb-[-15px]">Recommended Problems</h5>
                </div>
            </CardHeader>
            <CardBody className="overflow-x-hidden">
                <RecommendedProblems />
            </CardBody>
            <CardHeader>
                <div className="flex flex-row w-full justify-between items-center">
                    <h5 className="text-[18px] mb-[-15px]">Recently Completed</h5>
                </div>
            </CardHeader>
            <CardBody className="overflow-x-hidden">
                <RecentProblems />
            </CardBody>
        </Card> */}
        <Card>
            <CardHeader>
                <div className="w-full flex flex-row justify-around items-center font-bold bg-[#F8F7F7] rounded-[10px]">
                    <div
                        className={`cursor-pointer text-[14px] h-[40px] w-[20%] rounded flex justify-center items-center ${selected === 'topics' ? 'bg-[#0B2149] text-white' : 'text-themeDarkGray'}`}
                        onClick={() => setSelected("topics")}
                    >
                        Topics
                    </div>
                    <div
                        className={`cursor-pointer text-[14px] h-[40px] w-[20%] rounded flex justify-center items-center ${selected === 'quizandtests' ? 'bg-[#0B2149] text-white' : 'text-themeDarkGray'}`}
                        onClick={() => setSelected("quizandtests")}
                    >
                        Quizzes and Tests
                    </div>
                    <div
                        className={`cursor-pointer text-[14px] h-[40px] w-[20%] rounded flex justify-center items-center ${selected === 'qbank' ? 'bg-[#0B2149] text-white' : 'text-themeDarkGray'}`}
                        onClick={() => setSelected("qbank")}
                    >
                        Question Bank
                    </div>
                    <div
                        className={`cursor-pointer text-[14px] h-[40px] w-[20%] rounded flex justify-center items-center ${selected === 'rec' ? 'bg-[#0B2149] text-white' : 'text-themeDarkGray'}`}
                        onClick={() => setSelected("rec")}
                    >
                        Recommended Problems
                    </div>
                    <div
                        className={`cursor-pointer text-[14px] h-[40px] w-[20%] rounded flex justify-center items-center ${selected === 'recent' ? 'bg-[#0B2149] text-white' : 'text-themeDarkGray'}`}
                        onClick={() => setSelected("recent")}
                    >
                        Recently Completed
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-x-hidden">
                { selected === "topics" ? <TopicModules /> : ( selected === 'qbank' ? <QBankViewer /> : ( selected === 'rec' ? <RecommendedProblems /> : ( selected === 'recent' ? <RecentProblems /> : <QuizTable /> ))) }
            </CardBody>
        </Card>
        <div className="absolute bottom-5 left-5 w-[30px] h-[30px] rounded-[25px] border-[2px] bg-white border-black">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <path fill="currentColor" d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56"></path>
            </svg>
        </div>
    </div>
  );
}
