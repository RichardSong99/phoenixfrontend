"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchTestUnderlyingByID, fetchTestByName } from "@/app/helper/apiservices/testservice";
import { useData } from "@/app/helper/context/datacontext";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/react";

import {Button} from "@nextui-org/react";


export function PracticeTestPanel() {

    const router = useRouter();

    // const [testObjList, setTestObjList] = useState([]);
    // const [loading, setLoading] = useState(true);

    const {testUnderlyingList} = useData();

    // const practiceTests = [
    //     { name: "Practice test 1" },
    //     { name: "Practice test 2" },
    //     // Add more practice tests as needed
    // ];

    const onStartTest = (testName) => {
        const formattedTestName = encodeURIComponent(testName);
        router.push(`/study/practicetest/${formattedTestName}`);
    }

    const onReviewTest = (testID) => {
        const formattedTestID = encodeURIComponent(testID);
        router.push(`/study/reviewpracticetests/${formattedTestID}`);
    }

    // const loadTests = async () => {
    //     let tempTestObjList = [...testObjList];
    //     for (let test of practiceTests) {
    //         try {
    //             let testObj = await fetchTestByName({ testName: test.name });
    //             console.log("testObj", testObj)
    //             let testUnderlying = await fetchTestUnderlyingByID({ testID: testObj.id });
    //             console.log("testUnderlying", testUnderlying)
    //             tempTestObjList.push(testUnderlying);
    //         } catch (error) {
    //             tempTestObjList.push(null);
    //         }
    //     }
    //     setTestObjList(tempTestObjList);
    // }

    // useEffect(() => {
    //     const loadAndSetLoading = async () => {
    //         await loadTests();
    //         setLoading(false);
    //     };

    //     loadAndSetLoading();
    // }, []);



    return (
        <div >


            <Table removeWrapper>
                <TableHeader>
                        <TableColumn>Action</TableColumn>
                        <TableColumn>Test </TableColumn>
                        <TableColumn>Math score</TableColumn>
                        <TableColumn>Reading score</TableColumn>
                        <TableColumn>Total score</TableColumn>
                </TableHeader>
                <TableBody>
                    {testUnderlyingList && testUnderlyingList.length !== 0 && testUnderlyingList.map((testObj, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {(!testObj || !testObj?.Test?.Completed) && <Button size="sm" color = "primary" onClick={() => onStartTest(testObj?.Test?.Name)}>Start Test</Button>}
                                {testObj?.Test?.Completed && <Button size="sm" color = "success" variant = "bordered" onClick={() => onReviewTest(testObj?.Test?.id)}>Review Test</Button>}
                            </TableCell>
                            <TableCell>
                                {testObj?.Test?.Name}

                            </TableCell>

                            <TableCell>
                                {testObj && testObj?.MathScaled}
                                {!testObj && `-`}

                            </TableCell>
                            <TableCell>
                                {testObj && testObj?.ReadingScaled}
                                {!testObj && `-`}

                            </TableCell>
                            <TableCell>
                                {testObj && testObj?.TotalScaled}
                                {!testObj && `-`}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

    );
}
