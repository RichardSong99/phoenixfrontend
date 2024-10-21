"use client"

import React, { use, useContext, useEffect, useState } from 'react';
import { StartScreen } from '@/app/helper/components/practicetest/startscreen';
import { BreakScreen } from '@/app/helper/components/practicetest/breakscreen';
import { TestBox } from '@/app/helper/components/practicetest/testbox';
import { TestContext, TestProvider } from "@/app/study/activetest/activetestcontext";
import ContentViewer from '@/app/helper/components/newquestionview/contentviewer';
import { useRouter, useSearchParams } from 'next/navigation';
import QBankTable from '@/app/helper/components/qbank/qbankview/qbanktable';
import { fetchTestByID } from '@/app/helper/apiservices/testservice';
import {
    Tabs, Tab,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Progress,
    Button,
  } from "@nextui-org/react";

export default function Page() {
    return (
        <TestProvider>
            <TestReview />
        </TestProvider>
    );
}

function TestReview() {
    const { currentStage, testStageArray } = useContext(TestContext);
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const testID = searchParams.get('testid');
    const [test, setTest] = useState(null);

    // useEffect(() => {
    //     const test_data = await fetchTestByID({ testID });
    //     setTest(test_data);
    // }, [testID]);

    return (
        <div className="flex flex-col w-full justify-center p-10 gap-4">
            <div className="flex flex-row w-full justify-center landing-section">
                <Card
                className="bg-blue-500 rounded-lg shadow-md p-4"
                style={{ width: "100%" }}
                >
                    <CardHeader>
                        <h1 className="text-2xl font-bold text-white">My Tests</h1>
                    </CardHeader>
                </Card>
            </div>
            <Card>
                <CardHeader>
                <div className="flex flex-row w-full justify-between items-center">
                    
                </div>
                </CardHeader>
                <CardBody>
                <div className="w-full">
                    <Tabs aria-label="Options">
                        <Tab title="Overview">
                            <Card>
                            </Card>  
                        </Tab>
                        <Tab title="Questions">
                            <Card>
                                {/* <QBankTable questionEngagementCombos={}/> */}
                            </Card>  
                        </Tab>
                    </Tabs>
                </div>
                </CardBody>
            </Card>
        </div>
    );
}
