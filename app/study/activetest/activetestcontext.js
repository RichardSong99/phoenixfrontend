import React, { createContext, useState, useRef, useEffect } from "react";

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
    const testStageArray = [
        { stage: "Start", timeLimit: null },
        { stage: "Reading module 1", timeLimit: 1920 },
        { stage: "Reading module 2", timeLimit: 1920 },
        { stage: "Break", timeLimit: 600 },
        { stage: "Math module 1", timeLimit: 2100 },
        { stage: "Math module 2", timeLimit: 2100 },
    ];
    const [currentStage, setCurrentStage] = useState(0);
    
    const handleNextTestStage = () => {
        if (currentStage < testStageArray.length - 1) {
            setCurrentStage(currentStage + 1);
        }
    }

    return (
        <TestContext.Provider
            value={{
                testStageArray,
                currentStage,
                handleNextTestStage,
            }}
        >
            {children}
        </TestContext.Provider>
    );
};
