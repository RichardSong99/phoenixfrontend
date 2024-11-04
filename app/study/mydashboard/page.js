"use client"

import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Avatar,
    User,
    Popover,
    PopoverTrigger,
    PopoverContent,

} from "@nextui-org/react";
import Cookies from "js-cookie";

import { useRouter } from 'next/navigation';

import TopicModules from "./dashboardcomponents/topicmodules/topicmodules";
import { TotalDashboard } from "./dashboardcomponents/totaldashboard/totaldashboard";
import { RecommendedProblems, RecentProblems } from "./problemsuggestions/recommendedproblems";
import NewQBankViewer from "@/app/helper/components/qbank/qbankview/newqbankviewer";
import QuizzesAndTests from "@/app/helper/components/quizzestests/quizzesandtests";
import { QuestionContext } from "@/app/helper/context/questioncontext";
import { QuestionModal } from "@/app/helper/components/question/questionviewcomponents/questionmodal";
import NewDashboard from "./dashboardcomponents/totaldashboard/newdashboard";
import { useData } from "@/app/helper/context/datacontext";
import { useUser } from "@/app/helper/context/usercontext";

export default function MyDashboard() {
    const {
        isOpen,
        onOpenChange,
    } = useContext(QuestionContext);

    const router = useRouter();
    const [selected, setSelected] = useState("topics");
    const { isAuthenticated, setIsAuthenticated, user } = useUser();


    const { setGlobalLoading, loadUserData } = useData();

    useEffect(() => {
        setGlobalLoading(false);

        loadUserData();
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        router.push('/');
    };

    return (
        <div className="flex flex-col w-full justify-center items-center gap-4 bg-themeWhite">

            <div className="flex flex-col justify-center p-10 gap-4 min-w-80 w-2/3 pt-[70px] bg-themeWhite">
                <div className="w-full h-[55px] border-b bg-white fixed top-0 left-0 z-50 pl-[150px] pr-[100px] flex items-center justify-between  shadow-md">
                    <div className="flex items-center">
                        <h3 className="text-lg font-semibold">
                            
                        </h3>
                    </div>

                    <div className="flex items-center">
                        <Popover showArrow placement="bottom-end">
                            <PopoverTrigger className="border-2px border-gray-500">
                                <div>
                                    <img src="https://guardiananimal.com/wp-content/uploads/2019/04/dog-1194077_1280.jpg"
                                        className="h-[40px] w-[40px] rounded-full object-cover"
                                    />
                                </div>

                            </PopoverTrigger>
                            <PopoverContent className="p-1">
                                <Button onClick={() => handleLogout()} className="text-sm text-red-800 bg-red-100">Logout</Button>
                            </PopoverContent>
                        </Popover>

                    </div>
                </div>

                <div className="flex flex-row w-full justify-center">
                    <div className="w-full h-[75px] text-white bg-[#0B2149] text-white rounded-[10px] shadow-custom flex flex-row items-center pt-[10px] pl-[20px]">
                        <h4><strong>Welcome, {user?.first_name || ""}</strong></h4>
                    </div>
                </div>

                <NewDashboard />
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
                        <div className="w-full flex flex-row justify-around items-center font-bold bg-[#F8F7F7] rounded-[50px] text-center">
                            <div
                                className={`cursor-pointer text-[14px] h-[40px] w-[20%] rounded-[20px] flex justify-center items-center ${selected === 'topics' ? 'bg-[#0B2149] text-white' : 'text-themeDarkGray'}`}
                                onClick={() => setSelected("topics")}
                            >
                                Topics
                            </div>
                            <div
                                className={`cursor-pointer text-[14px] h-[40px] w-[20%]  rounded-[20px] flex justify-center items-center ${selected === 'quizandtests' ? 'bg-[#0B2149] text-white' : 'text-themeDarkGray'}`}
                                onClick={() => setSelected("quizandtests")}
                            >
                                Quizzes and Tests
                            </div>
                            <div
                                className={`cursor-pointer text-[14px] h-[40px] w-[20%]  rounded-[20px] flex justify-center items-center ${selected === 'qbank' ? 'bg-[#0B2149] text-white' : 'text-themeDarkGray'}`}
                                onClick={() => setSelected("qbank")}
                            >
                                Question Bank
                            </div>
                            {/* <div
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
                        </div> */}
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-x-hidden flex-row justify-center">
                        {selected === "topics" ? <TopicModules /> : (selected === 'qbank' ? <NewQBankViewer /> : (selected === 'rec' ? <RecommendedProblems /> : (selected === 'recent' ? <RecentProblems /> : <QuizzesAndTests />)))}
                    </CardBody>
                </Card>
                <QuestionModal isOpen={isOpen} onOpenChange={onOpenChange} mode="practice" />

      
                {/* Footer */}

            </div>
            <footer className="w-full bg-gray-800 text-white text-sm mt-8 py-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex space-x-4">
                        <a href="/about" className="text-white transition">About Us</a>
                        <a href="/privacy" className="text-white transition">Privacy Policy</a>
                        <a href="/contact" className="text-white transition">Contact</a>
                    </div>
                    <div className="text-center">
                        © {new Date().getFullYear()} Phoenix SAT. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
