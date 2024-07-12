"use client"

import React, { useState, useEffect } from 'react';

import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // Update import

import { ContentViewer } from '../../../helper/components/contentviewer/contentviewer';
import { fetchQuizUnderlyingById } from '@/app/helper/apiservices/quizservice';
import { createProcessedObjectList } from '../../../helper/data/objectlist';
import { fetchQuizData } from '../../../helper/data/objectlist';

export default function Page() {
    const router = useRouter(); // Update variable name
    const pathname = usePathname(); // Update variable name
    const searchParams = useSearchParams(); // Update variable name
    const [quizID, activeIndex] = pathname.split('/').slice(-2).map(part => decodeURI(part));
    const search = searchParams.get('review');

    console.log(search, "search")

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
        router.push(`/study/myquizzes/`);
    }

    const handleFetchQuizData = async () => {
        await fetchQuizData(quizID, setNumTotal, setNumCompleted, setNumCorrect, setNumIncorrect, setNumOmitted, setNumUnattempted, setPercentCompleted, setPercentCorrect, setObjectList);
    }

    useEffect(() => {
         handleFetchQuizData();
    }, []);

    
    return (
        <>{objectList && 
        <ContentViewer
            groupName={"Quiz"}
            mode={"quiz"}
            activeIndex={parseInt(activeIndex)}
            handleClose={handleClose}
            objectList={objectList}
            quizID = {quizID}
            refreshObjectList={handleFetchQuizData}
            reviewMode = {search === "true" ? true : false}
            numCompleted={numCompleted}
            numTotal={numTotal}
            numCorrect={numCorrect}
            numIncorrect={numIncorrect}
            numOmitted={numOmitted}
            numUnattempted={numUnattempted}
            percentCompleted={percentCompleted}
            percentCorrect={percentCorrect}
        />}
        </>
    );
}




