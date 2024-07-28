"use client"

import React, { useState, useEffect, useContext } from 'react';

import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // Update import

import { ContentViewer } from '../../../helper/components/contentviewer/contentviewer';
import { QuestionContext } from '@/app/helper/context/questioncontext';

export default function Page() {
    const router = useRouter(); // Update variable name
    const pathname = usePathname(); // Update variable name
    const searchParams = useSearchParams(); // Update variable name
    const [quizID, activeIndex] = pathname.split('/').slice(-2).map(part => decodeURI(part));
    const search = searchParams.get('review');

    console.log(search, "search")

    const handleClose = () => {
        router.push(`/study/myquizzes/`);
    }

    const {
        setupActiveQuizMode, 
        setupReviewQuizMode,
    } = useContext(QuestionContext);

    useEffect(() => {
        if (search === "true") {
            setupReviewQuizMode(quizID);
        } else {
            setupActiveQuizMode(quizID);
        }
    }, []);
    
    return (
        <>
        <ContentViewer
            groupName={"Quiz"}
            mode={"quiz"}
            handleClose={handleClose}

        />
        </>
    );
}




