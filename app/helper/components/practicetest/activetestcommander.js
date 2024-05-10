"use client"

import React, { useState, useEffect, useContext } from "react";
import { fetchQuizUnderlyingById } from "@/app/helper/apiservices/quizservice";
import { createProcessedObjectList } from "../../data/objectlist";
import { ContentViewer } from "../contentviewer/contentviewer";
import { StartScreen } from "./startscreen";
import { BreakScreen } from "./breakscreen";
import { NavBarContext } from "@/app/helper/context/navbarcontext";
import { useRouter } from "next/navigation";
import { markTestCompleted } from "@/app/helper/apiservices/testservice";

export const ActiveTestCommander = ({ test }) => {

    const router = useRouter();

    const [activeTestStageIndex, setActiveTestStageIndex] = useState(0);
    const [activeObjectList, setActiveObjectList] = useState(null);
    const [activeQuizID, setActiveQuizID] = useState(null);
    const { setIsStudyNavBarVisible, setIsTopNavBarVisible } = useContext(NavBarContext);

    const testStageArray = [
        { stage: "Start", timeLimit: null },
        { stage: "Reading module 1", quizNum: 0, timeLimit: 32 },
        { stage: "Reading module 2", quizNum: 1, timeLimit: 32 },
        { stage: "Break", timeLimit: 10 },
        { stage: "Math module 1", quizNum: 2, timeLimit: 35 },
        { stage: "Math module 2", quizNum: 3, timeLimit: 35 },
    ];

    const handleNext = () => {
        if (activeTestStageIndex < testStageArray.length - 1) {
            setActiveTestStageIndex(activeTestStageIndex + 1);
        } else {
            // set the test to completed
            // navigate to the test results page
            markTestCompleted({ testID: test.id });
            router.push(`/study/reviewpracticetests/${test.id}`);
        }

    }




    useEffect(() => {
        const fetchTestModule = async () => {
            if (testStageArray[activeTestStageIndex].quizNum !== undefined && test !== undefined) {
                console.log("test in active test commander", test)
                let quizID = test?.QuizIDList[testStageArray[activeTestStageIndex].quizNum];
                setActiveQuizID(quizID);
                let response = await fetchQuizUnderlyingById({ quizID });
                console.log("quiz underlying", response)
                setActiveObjectList(createProcessedObjectList({ type: "practiceQuestions", rawObjectList: response.Questions }));
            }
        };
    
        fetchTestModule();
    }, [activeTestStageIndex]);

    return (
        <>
            {activeTestStageIndex === 0 && <StartScreen startHandler={() => handleNext()} />}
            {[1, 2, 4, 5].includes(activeTestStageIndex) && activeObjectList &&
                <ContentViewer
                    objectList={activeObjectList}
                    groupName={testStageArray[activeTestStageIndex].stage}
                    mode={"test"}
                    activeIndex={0}
                    quizID={activeQuizID}
                    onNext={handleNext}
                    timeLimit={testStageArray[activeTestStageIndex].timeLimit}
                />}
            {activeTestStageIndex === 3 && <BreakScreen timeLimit={testStageArray[activeTestStageIndex].timeLimit} onNext={() => handleNext()}/>}
        </>
    );
}
