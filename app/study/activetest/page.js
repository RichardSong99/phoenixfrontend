"use client"

import React, { use, useContext, useEffect, useState } from 'react';
import { StartScreen } from '@/app/helper/components/practicetest/startscreen';
import { BreakScreen } from '@/app/helper/components/practicetest/breakscreen';
import { TestBox } from '@/app/helper/components/practicetest/testbox';
import { TestContext, TestProvider } from "@/app/study/activetest/activetestcontext";
import ContentViewer from '@/app/helper/components/newquestionview/contentviewer';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { QuestionContext, QuestionProvider } from '@/app/helper/context/questioncontext';
import { Spinner } from '@nextui-org/react';

export default function Page() {
    return (
        <TestProvider>
            <QuestionProvider>
                <TestContent />
            </QuestionProvider>
        </TestProvider>
    );
}

function TestContent() {
    const {
        setupTestMode,
        indquizMode
    } = useContext(QuestionContext);

    const {
        currentStage,
        initializeModuleIDs,
        handleNextTestStage,
    } = useContext(TestContext);

    const testStageArray = [
        { stage: "Start", timeLimit: null },
        { stage: "Reading module 1", timeLimit: 1920, quiz:0 },
        { stage: "Reading module 2", timeLimit: 1920, quiz:1 },
        { stage: "Break", timeLimit: 600 },
        { stage: "Math module 1", timeLimit: 2100, quiz:2 },
        { stage: "Math module 2", timeLimit: 2100, quiz:3 },
    ];
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const testID = searchParams.get('testid');

    const [standardModuleIDs, setStandardModuleIDs] = useState([]);

    useEffect(() => {
        const initialize = async () => {
            if (testID) {
                const IDs = await initializeModuleIDs(testID);
                setStandardModuleIDs(IDs);
                console.log("IDs", IDs);
            }
        };
    
        initialize();
    }, []);

    useEffect(() => {
        if(currentStage != 0 || currentStage != 3){
            setupTestMode(standardModuleIDs[testStageArray[currentStage].quiz]);
        }
    }, [currentStage]);

    return (
        <div>
            <div className='z-[10] w-screen h-screen absolute top-0 left-0 bg-white'>
                {(currentStage == 1 || currentStage == 2 || currentStage == 4 || currentStage == 5) && indquizMode !== 'test' ?
                    <div className='w-screen h-screen z-[12] absolute top-0 left-0 bg-white flex flex-col justify-center items-center'>
                        <div className='mb-[20px]'>Loading Next Section...</div>
                        <Spinner />
                    </div> :
                        <div>
                            { (currentStage == 1 || currentStage == 2 || currentStage == 4 || currentStage == 5) &&
                                <div className='w-screen absolute bottom-[85px] left-[84px] z-[11]'>
                                    <Button onClick={handleNextTestStage} className='text-appleGray1 bg-white border-[2px] border-appleBlue rounded-[20px]'>Next Section</Button>
                                </div>
                            }
                        </div>
                }
                {currentStage === 0 && <StartScreen testID={testID} />}
                {currentStage === 1 && <ContentViewer />}
                {currentStage === 2 && <ContentViewer />}
                {currentStage === 3 && <BreakScreen />}
                {currentStage === 4 && <ContentViewer />}
                {currentStage === 5 && <ContentViewer />}
            </div>
        </div>
    );
}
