"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Update import
import { ContentViewer } from '../../components/contentviewer/contentviewer';
import { fetchQuiz, initializeQuiz, addEngagementToQuiz } from '@/app/services/quizservice';
import { fetchPracticeModule } from '@/app/services/parameterdataservice';
import { fetchQuizData } from '../../data/objectlist';

export default function Page() {

    const pathname = usePathname(); // Update variable name
    const router = useRouter(); // Update variable name
    const [groupId, activeIndex] = pathname.split('/').slice(-2).map(part => decodeURI(part));

    const [quizID, setQuizID] = useState(null);
    const [numTotal, setNumTotal] = useState(0);
    const [numCompleted, setNumCompleted] = useState(0);
    const [numCorrect, setNumCorrect] = useState(0);
    const [numIncorrect, setNumIncorrect] = useState(0);
    const [numOmitted, setNumOmitted] = useState(0);
    const [numUnattempted, setNumUnattempted] = useState(0);
    const [percentCompleted, setPercentCompleted] = useState(0.0);
    const [percentCorrect, setPercentCorrect] = useState(0.0);
    const [objectList, setObjectList] = useState(null);

    const handleClose = () => {
        router.push(`/study/practicemodule/`);
    }

    const handleFetchQuizData = async () => {
        console.log("handleFetchQuizData")
        await fetchQuizData(quizID, setNumTotal, setNumCompleted, setNumCorrect, setNumIncorrect, setNumOmitted, setNumUnattempted, setPercentCompleted, setPercentCorrect, setObjectList);
    }

    const getQuizIDFromPracticeModule = async () => {
        try {
            const response = await fetchQuiz({ quizName: groupId });
            setQuizID(response.id);
        } catch (error) {
            console.log("error", error)
            // if there's an error, then we need to create a quiz with this set of questions
            const response = await fetchPracticeModule({ name: groupId });
            // create the quiz
            const quizIDresponse = await initializeQuiz({ questionIDs: response.QuestionIDs, quizName: groupId, quizType: "practice" });
            setQuizID(quizIDresponse.quizID);
        }
    }

    useEffect(() => {
        getQuizIDFromPracticeModule();
    }, []);

    useEffect(() => {
        if (quizID !== null) {
            handleFetchQuizData();
        }
    }, [quizID]);

    // const logEngagementHandler = async ({engagementID}) => {
    //     console.log("calling add engagement to quiz")
    //     await addEngagementToQuiz({quizID: quizID, engagementID: engagementID});
    //     handleFetchQuizData();
    // }


    return (
        <>{objectList && quizID && <ContentViewer
            groupName={groupId}
            mode={"practiceQuestions"}
            activeIndex={parseInt(activeIndex)}
            handleClose={handleClose}
            objectList={objectList}
            numTotal={numTotal}
            numCompleted={numCompleted}
            numCorrect={numCorrect}
            numIncorrect={numIncorrect}
            numOmitted={numOmitted}
            numUnattempted={numUnattempted}
            percentCompleted={percentCompleted}
            percentCorrect={percentCorrect}
            refreshObjectList={handleFetchQuizData}
            quizID={quizID}
        />}
        </>
    );
}
