"use client"

import React, { useState, useEffect } from "react";
import styles from "./practicetest.module.css";
import { Header } from "../components/header/header";
import { TestBox } from "../components/practicetest/testbox";
import { useRouter } from "next/navigation";
import { fetchTestUnderlyingByID, fetchTestByName } from "@/app/services/testservice";

export default function PracticeTest() {

    const router = useRouter();

    const [testObjList, setTestObjList] = useState([]);
    const [loading, setLoading] = useState(true);

    const practiceTests = [
        { name: "Practice test 1" },
        { name: "Practice test 2" },
        // Add more practice tests as needed
    ];

    const onStartTest = (testName) => {
        const formattedTestName = encodeURIComponent(testName);
        router.push(`/study/practicetest/${formattedTestName}`);
    }

    const onReviewTest = (testID) => {
        const formattedTestID = encodeURIComponent(testID);
        router.push(`/study/reviewpracticetests/${formattedTestID}`);
    }

    const loadTests = async () => {
        let tempTestObjList = [...testObjList];
        for (let test of practiceTests) {
            try {
                let testObj = await fetchTestByName({ testName: test.name });
                console.log("testObj", testObj)
                let testUnderlying = await fetchTestUnderlyingByID({ testID: testObj.id });
                console.log("testUnderlying", testUnderlying)
                tempTestObjList.push(testUnderlying);
            } catch (error) {
                tempTestObjList.push(null);
            }
        }
        setTestObjList(tempTestObjList);
    }

    useEffect(() => {
        const loadAndSetLoading = async () => {
            await loadTests();
            setLoading(false);
        };

        loadAndSetLoading();
    }, []);




    return (
        <div className = {styles.outerDiv}>
            <div className={styles.mainPanel}>
                {/* <Header text="Practice Tests" /> */}
                <div className = {styles.banner}>
                    <h3>PRACTICE TESTS</h3>
                    <span>Take a practice test when you feel ready. Reviewing previous tests is a good way to learn.</span>
                </div>

                <div className={styles.tableWrapper}>
                    {/* {practiceTests.map(test => (
                    <TestBox testName={test.name} onStartTest={() => onStartTest(test.name)} onReviewTest={() => onReviewTest(test.name)}/>
                ))} */}
                    <table className={styles.myQuizTable}>
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Test </th>
                                <th>Math score</th>
                                <th>Reading score</th>
                                <th>Total score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && testObjList.map((testObj, index) => (
                                <tr key={index}>
                                    <td>
                                        {(!testObj || !testObj?.test?.Completed) && <div onClick={() => onStartTest(practiceTests[index].name)} className = {styles.startTestButton}>Start Test</div>}
                                        {testObj?.test?.Completed && <div onClick={() => onReviewTest(testObj.test.id)} className = {styles.reviewTestButton}>Review Test</div>}
                                    </td>
                                    <td>
                                        {testObj && testObj?.test?.Name}
                                        {!testObj && practiceTests[index].name}
                                    
                                    </td>

                                    <td>
                                        {testObj && testObj?.mathScaled}
                                        {!testObj && `-`}

                                    </td>
                                    <td>
                                        {testObj && testObj?.readingScaled}
                                        {!testObj && `-`}

                                    </td>
                                    <td>
                                        {testObj && testObj?.totalScaled}
                                        {!testObj && `-`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
