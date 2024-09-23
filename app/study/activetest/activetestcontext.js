import React, { createContext, useState, useRef, useEffect, useContext } from "react";
import { QuestionContext } from "@/app/helper/context/questioncontext";
import { fetchTestByID } from "@/app/helper/apiservices/testservice";
import { useRouter } from "next/navigation";

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
const router = useRouter();

    const {
        setupTestMode,
    } = useContext(QuestionContext);

    const testStageArray = [
        { stage: "Start", timeLimit: null },
        { stage: "Reading module 1", timeLimit: 1920, quiz:0 },
        { stage: "Reading module 2", timeLimit: 1920, quiz:1 },
        { stage: "Break", timeLimit: 600 },
        { stage: "Math module 1", timeLimit: 2100, quiz:2 },
        { stage: "Math module 2", timeLimit: 2100, quiz:3 },
    ];

    const [currentStage, setCurrentStage] = useState(0);

    const initializeModuleIDs = async (testID) => {
        const newModuleIDs = [];
        const test = await fetchTestByID({ testID });
        for(let i = 0; i < 4; i++){
            newModuleIDs.push(test.quiz_id_list[i]);
        }
        return newModuleIDs;
    }
    
    const handleNextTestStage = () => {
        if (currentStage < 5) {
            console.log("currentStage", currentStage);
            setCurrentStage(currentStage + 1);
        } else {
            router.push(`/study/mytests`);
        }
    }

    return (
        <TestContext.Provider
            value={{
                testStageArray,
                currentStage,
                initializeModuleIDs,
                handleNextTestStage,
            }}
        >
            {children}
        </TestContext.Provider>
    );
};
