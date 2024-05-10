"use client"

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchTestByName, fetchTestByID, postTest } from "@/app/helper/apiservices/testservice";
import { fetchTestRepresentation } from "@/app/helper/apiservices/parameterdataservice";
import { initializeQuiz, fetchQuiz } from "@/app/helper/apiservices/quizservice";
import { ActiveTestCommander } from "../../../helper/components/practicetest/activetestcommander";

export default function Page() {
    const pathname = usePathname(); // Update variable name
    console.log('Page component rendered');


    const [testName] = pathname.split('/').slice(-1).map(part => decodeURI(part));
    const [test, setTest] = useState(null);

    const loadTest = async () => {
        console.log("loading test")
        try {
            let response = await fetchTestByName({ testName: testName });
            console.log("test response, fetching by name", response)
            setTest(response);
        } catch (error) {
            let response = await fetchTestRepresentation({ testName: testName });
            let quizIDList = [];
            for (let i = 0; i < response.QuestionLists.length; i++) {
                let thisQuizName = testName + " - Module " + (i + 1);
                try {
                    let quizResponse = await fetchQuiz({ quizName: thisQuizName });
                    console.log("quiz response", quizResponse)
                    quizIDList.push(quizResponse.id);
                } catch (error) {
                    try {
                        let quizResponse = await initializeQuiz({ questionIDs: response.QuestionLists[i], quizName: thisQuizName, quizType: "test" });
                        console.log("quiz response", quizResponse);
                        quizIDList.push(quizResponse.quizID);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
    
            console.log("quizIDList", quizIDList)
    
            if (quizIDList.length !== response.QuestionLists.length) {
                console.log("we do not have enough quizzes")
                return;
            }
            response = await postTest({ name: testName, quizIDList: quizIDList });
            setTest(response);
        }
    }

    useEffect(() => {
        loadTest();
    }, []);

    useEffect(() => {
        if (test && test.Completed) {
            // navigate to the test results page
        }
    }, [test]);


    return (
        <>
            {test && !test?.Completed && <ActiveTestCommander test={test} />}
        </>
    );
}