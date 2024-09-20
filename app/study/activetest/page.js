"use client"

import React, { useContext } from 'react';
import { StartScreen } from '@/app/helper/components/practicetest/startscreen';
import { BreakScreen } from '@/app/helper/components/practicetest/breakscreen';
import { TestBox } from '@/app/helper/components/practicetest/testbox';
import { TestContext, TestProvider } from "@/app/study/activetest/activetestcontext";
import ContentViewer from '@/app/helper/components/newquestionview/contentviewer';

export default function Page() {
    return (
        <TestProvider>
            <TestContent />
        </TestProvider>
    );
}

function TestContent() {
    const { currentStage, testStageArray } = useContext(TestContext);

    return (
        <div className='z-[10] w-screen h-screen absolute top-0 left-0 bg-white'>
            {currentStage === 0 && <StartScreen />}
            {currentStage === 1 && <ContentViewer />}
            {currentStage === 2 && <TestBox testStage={testStageArray[2]} />}
            {currentStage === 3 && <BreakScreen />}
            {currentStage === 4 && <TestBox testStage={testStageArray[4]} />}
            {currentStage === 5 && <TestBox testStage={testStageArray[5]} />}
        </div>
    );
}
